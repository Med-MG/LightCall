using System;

namespace Domain
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Project_Type { get; set; }
        public string Question_description { get; set; }
        public bool IsShopify { get; set; }
        public string WebHookSecret{ get; set; }
        public AppUser User { get; set; }
    }
}