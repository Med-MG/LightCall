using System;
using System.Collections.Generic;

namespace Domain
{
    public class OrderSheet
    {
        
        public string SpreadsheetId { get; set; }
        public string sheet { get; set; } 
        // public Guid Project_id { get; set; }

        public ICollection<Guid> Products_ids { get; set; }
    }
}