using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Web;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using Persistence;
using Domain;
using Microsoft.AspNetCore.Identity;
using Application.Interfaces;
using Application.Orders;
using MediatR;
using Newtonsoft.Json.Linq;
using API.DTOs;

namespace API.Controllers
{

    public class OrderController : BaseApiController
    {
        private readonly DataContext _context;
        
        private readonly IUserAccessor _userAccessor;

        public OrderController(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            
            _userAccessor = userAccessor;
        }



        [HttpPost("Import")]
        public async Task<JsonResult> ImportFile([FromForm]  IFormFile importFile , [FromForm] string statusId , [FromForm] string projectId)
        {
            if (importFile == null) return Json(new { Status = 0, Message = "No File Selected" });


            try
            {

                var orderList = new List<Order>();
                StatusModel status = await _context.Status.FindAsync(statusId); 
                Project project = await _context.Projects.FindAsync(projectId);

                using (var stream = new MemoryStream())
                {
                    await importFile.CopyToAsync(stream);
                    using(var package = new ExcelPackage(stream))
                    {
                        ExcelWorksheet excelWorksheet = package.Workbook.Worksheets[0];
                        var rowcount = excelWorksheet.Dimension.Rows;
                        for (int row = 2; row < rowcount   ; row++)
                        {

                            orderList.Add(new Order
                            {
                                OrderId = excelWorksheet.Cells[row, 1].Value.ToString().Trim(),
                                Description = excelWorksheet.Cells[row, 2].Value.ToString().Trim(),
                                //Customer = excelWorksheet.Cells[row, 3].Value.ToString().Trim(),
                                Price = Convert.ToInt32(excelWorksheet.Cells[row, 4].Value.ToString().Trim()),
                                // Product = excelWorksheet.Cells[row, 5].Value.ToString().Trim(),
                                Status = status,
                                Project = project


                            }); ;

                        }

                        await _context.Orders.AddRangeAsync(orderList);
                        await _context.SaveChangesAsync();
                    }
                }



                

                return Json(new { Status = 1, Message = "File Imported Successfully " });
            }
            catch (Exception ex)
            {
                return Json(new { Status = 0, Message = ex.Message });
            }

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        [HttpGet]
        [Route("statistic")]
        public async Task<ActionResult<OrderStatistic>> GetOrdersStatics()
        {

            var statistics = new OrderStatistic();

            var query =  _context.Orders.Include(o => o.Status);

            statistics.orders =  query.Count();
            statistics.ordersConfirmer = query.Where(o => o.Status.StatusType == "confirmer" ).Count();
            statistics.ordersNew = query.Where(o => o.Status.StatusType == "new order" ).Count();
            statistics.ordersLivrer = query.Where(o => o.Status.StatusType == "livrer").Count();

            return statistics;


        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { id = id }));

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(Guid id, Order order)
        {
            order.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Order = order }));
        }

        [HttpPut("operateur")]
        public async Task<IActionResult> OrderOperateur()
        {
            var id = _userAccessor.GetUserId();
            var Operator = await _context.OperatoreAccount.FindAsync(id);

            Operator.AssignOrderId = null;

            await _context.SaveChangesAsync();

            return Ok();

        }



        [HttpPost]
        public async Task<IActionResult> PostOrder( Order order)
        {

          return HandleResult(  await Mediator.Send(new Create.Command { Order = order }));
           

        }


        [HttpPost("Shopify/{id}")]
        public async Task<IActionResult> ShopifyOrder(Guid id, ShopifyOrderDto shopifyOrder)
        {



            Project project = _context.Projects.FindAsync(id).Result;

            Domain.Customer customer = new Domain.Customer
            {
                FullName = shopifyOrder.customer.first_name + " " + shopifyOrder.customer.last_name,
                Email = shopifyOrder.customer.email,
                Phone = shopifyOrder.customer.default_address.phone,
                FullAdresse = shopifyOrder.customer.default_address.address1 + " , " + shopifyOrder.customer.default_address.address1


            };

            var orderId = shopifyOrder.id;
            var price = shopifyOrder.total_price;

            Order order = new Order
            {
                OrderId = orderId.ToString(),
                Price = Decimal.Parse(price),
                Project = project,
                Customer = customer
            };

            List<Product> products = new List<Product>();

            shopifyOrder.line_items.ForEach((item) =>
            {

                Product product = new Product
                {
                    Name = item.name,
                    Quantity = item.quantity,
                    Project = project
                };


                products.Add(product);

            });

            order.Product = products;



            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            return Ok();

        }

        [HttpPost]
        [Route("WooCommerce/{id}")]
        public async Task<IActionResult> WooCommerceOrder(Guid id, WooCommerceDto WooCommerceOrder)
        {
            Project project = _context.Projects.FindAsync(id).Result;

            Domain.Customer customer = new Domain.Customer
            {
                FullName = WooCommerceOrder.customer.first_name + " " + WooCommerceOrder.customer.last_name,
                Email = WooCommerceOrder.customer.email,
                Phone = WooCommerceOrder.customer.billing_address.phone,
                FullAdresse = WooCommerceOrder.customer.billing_address.address_1 


            };

            var orderId = WooCommerceOrder.id;
            var price = WooCommerceOrder.total;

            Order order = new Order
            {
                OrderId = orderId.ToString(),
                Price = Decimal.Parse(price),
                Project = project,
                Customer = customer
            };

            List<Product> products = new List<Product>();

            WooCommerceOrder.line_items.ForEach((item) =>
            {

                Product product = new Product
                {
                    Name = item.name,
                    Quantity = item.quantity,
                    Project = project
                };


                products.Add(product);

            });

            order.Product = products;



            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(Guid id)
        {

            return HandleResult(await Mediator.Send(new Delete.Command { id = id }));

        }


        [HttpPut("inAsinOrder")]

        public async Task<IActionResult> InAsinOrder(Guid id)
        {

            return HandleResult(await Mediator.Send(new InAssign.Command { id = id }));

        }


        [HttpPut("AsinOrder")]
        public async Task<IActionResult> AsinOrder()
        {

            return HandleResult(await Mediator.Send(new Assign.Query()));


        }


    }
}
