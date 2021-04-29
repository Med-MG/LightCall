﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public int OrderId { get; set; }
        public string Description { get; set; }
        public List<OperatorAcc> Operators { get; set; }
        public string  Product { get; set; }
        public string Customer { get; set; }
        public Confirmation  Confirmation  { get; set; }
        public Projects Project  { get; set; }
        public StatusModel Status { get; set; }
        [Column(TypeName = "money")]
        public decimal Price { get; set; }




    }
}
