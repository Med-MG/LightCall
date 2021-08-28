using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class StatusModel
    {
        public Guid Id { get; set; }
        public string StatusType { get; set; }
        public int StatusPiority { get; set; }
        public bool ClosingStatus { get; set; }
        

    }
}
