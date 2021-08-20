using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderStatistic
    {
        public int orders { get; set; }
        public int ordersConfirmer { get; set; }
        public int ordersLivrer { get; set; }
        public int ordersNew { get; set; }
        //public int orders { get; set; }
        //public int orders { get; set; }
        //public int orders { get; set; }
    }
}
