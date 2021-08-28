using System;
using System.Collections.Generic;

namespace Domain
{
    public class City
    {
        public Guid Id { get; set; }
        public string CityName { get; set; }
        public string ZipCode { get; set; } 
        public virtual IList<Shipping_Company> Shipping_Companies { get; set; }
    }
}