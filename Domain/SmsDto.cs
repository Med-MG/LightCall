using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class SmsDto
    {
        public Guid Id { get; set; }
        public string SmsName { get; set; }
        public string Message { get; set; }
        public Guid ProjectId { get; set; }
        public Guid StatusId { get; set; }
        public bool IsActive { get; set; }
    }
}
