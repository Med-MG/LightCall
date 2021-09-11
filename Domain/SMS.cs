using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class SMS
    {

        public Guid Id { get; set; }
        public string SmsName { get; set; }
        public string Message { get; set; }
        public Project Project { get; set; }
        public StatusModel Status { get; set; }
        public bool IsActive { get; set; }


    }
}
