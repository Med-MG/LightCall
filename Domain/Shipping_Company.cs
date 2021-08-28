using System;
using System.Collections.Generic;

namespace Domain
{
    public class Shipping_Company
    {
        
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ApiClient { get; set; }
        public virtual IList<City> Cities { get; set; }
    }
}