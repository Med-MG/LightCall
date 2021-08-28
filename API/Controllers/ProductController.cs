using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Products;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromForm] ProductDto product)
        {
            return HandleResult( await Mediator.Send(new Create.Command{Product = product}));
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await Mediator.Send(new List.Query());
            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> FindProduct(Guid id)
        {
            return HandleResult( await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct( Guid id, [FromForm] ProductDto product)
        {  
           product.Id = id;
           return HandleResult( await Mediator.Send(new Edit.Command { Product = product  }));   
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {   
            return Ok(await Mediator.Send(new Delete.Command{id = id})); 
        }
    }
}