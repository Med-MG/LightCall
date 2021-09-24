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
using Google.Apis.Sheets.v4;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;

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
            statistics.ordersBusy = query.Where(o => o.Status.StatusType == "busy").Count();
            statistics.ordersCancel = query.Where(o => o.Status.StatusType == "cancelled").Count();
            statistics.ordersCallLater = query.Where(o => o.Status.StatusType == "call later").Count();
            statistics.ordersDoubleCommande = query.Where(o => o.Status.StatusType == "double commande").Count();

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
        [HttpPut("operateurStatus")]
        public async Task<IActionResult> OperateurStatus()
        {
            var id = _userAccessor.GetUserId();
            var Operator = await _context.OperatoreAccount.FindAsync(id);

            Operator.Status = !Operator.Status;

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
            var status = _context.Status.Where(s => s.StatusType == "new order").FirstOrDefault();
            order.Status = status;

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

            var status = _context.Status.Where(s => s.StatusType == "new order").FirstOrDefault();
            order.Status = status;

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


        [HttpPut("inAsinOrder/{id}")]

        public async Task<IActionResult> InAsinOrder(Guid id)
        {

            return HandleResult(await Mediator.Send(new InAssign.Command { id = id }));

        }


        [HttpPut("AsinOrder")]
        public async Task<IActionResult> AsinOrder()
        {

            return HandleResult(await Mediator.Send(new Assign.Query()));


        }


        //sheet  
        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets} ;
        static readonly string ApplicationName = "OrdersSheet" ;
        // static readonly string SpreadsheetId = "1uTjbQytwtJALPPVj-L2Vtw2vNY7H3F76jG8b4XbXZfI" ;
        // static readonly string sheet = "dpp" ;
        static SheetsService service;
        [HttpPost ("sheet")]
        public async Task<IActionResult> Sheet(OrderSheet sheetInfo){
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            GoogleCredential credential;
            using(var stream = new FileStream("google-credentials.json", FileMode.Open , FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream).CreateScoped(Scopes);
            }
            service = new SheetsService(new BaseClientService.Initializer(){
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });
            // SeedOrder();
            //seed data in db
            var range = $"{sheetInfo.sheet}!A:B";
            var request = service.Spreadsheets.Values.Get(sheetInfo.SpreadsheetId , range);

            var orderList = new List<Order>();
            var response = request.Execute();
            Guid idStatus = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa6");
            StatusModel status = await _context.Status.FindAsync(idStatus);
            Guid idprj = Guid.Parse("3FA85F64-5717-4562-B3FC-2C963F66AFA6");
            Project project = await _context.Projects.FindAsync(idprj);
            // Project project = await _context.Projects.FindAsync(sheetInfo.Project_id);
            // Guid prddd = Guid.Parse("EA519F8E-E666-4EF7-91AA-EAA572F74A9A");
            // Product prodd = await _context.Products.FindAsync(prddd);
            List<Product> Products = new List<Product>();
            // Products.Add(prodd);
            foreach (var product in sheetInfo.Products_ids)
                {
                    Products.Add(await _context.Products.FindAsync(product));
                }
            var values = response.Values;
            if(values != null && values.Count > 0){
                foreach(var row in values){
                    // var loool = row[0].ToString().Trim();
                    // var mppp = loool;
                    orderList.Add(new Order
                            {
                                OrderId = row[0].ToString().Trim(),
                                Description = "desk",
                                
                                //Customer = excelWorksheet.Cells[row, 3].Value.ToString().Trim(),
                                Price = 3,
                                Status = status,
                                Project = project,
                                Product = Products,
                            }); ;
                }
                await _context.Orders.AddRangeAsync(orderList);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        
        // public async void SeedOrder(){
            
        // }
    }
}
