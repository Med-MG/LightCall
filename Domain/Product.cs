using System;

namespace Domain
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public Project Project { get; set; }
        public Upsell upsell { get; set; }
        public AppUser User { get; set; }

    }
}