using System;
using Microsoft.AspNetCore.Http;

namespace Application.Products
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public Guid ProjectId { get; set; }

        public IFormFile file { get; set; }
    }
}