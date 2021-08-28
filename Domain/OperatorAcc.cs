using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class OperatorAcc : AppUser
    {
        
        public bool Status { get; set; }
        public List<Order> Orders { get; set; }
        public string AssignOrderId { get; set; }
    }
}