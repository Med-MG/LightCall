using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{

    public class PaymentDetails
    {
        public string method_id { get; set; }
        public string method_title { get; set; }
        public bool paid { get; set; }
    }

    public class WooBillingAddress
    {
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string company { get; set; }
        public string address_1 { get; set; }
        public string address_2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string postcode { get; set; }
        public string country { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
    }

    public class WooShippingAddress
    {
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string company { get; set; }
        public string address_1 { get; set; }
        public string address_2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string postcode { get; set; }
        public string country { get; set; }
    }

    public class Meta
    {
        public string key { get; set; }
        public string label { get; set; }
        public string value { get; set; }
    }

    public class WooLineItem
    {
        public int id { get; set; }
        public string subtotal { get; set; }
        public string subtotal_tax { get; set; }
        public string total { get; set; }
        public string total_tax { get; set; }
        public string price { get; set; }
        public int quantity { get; set; }
        public object tax_class { get; set; }
        public string name { get; set; }
        public int product_id { get; set; }
        public string sku { get; set; }
        public List<Meta> meta { get; set; }
    }

    public class WooCustomer
    {
        public int id { get; set; }
        public string email { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public WooBillingAddress billing_address { get; set; }
        public WooShippingAddress shipping_address { get; set; }
    }

    public class WooCommerceDto
    {
        public int id { get; set; }
        public int order_number { get; set; }
        public string order_key { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public DateTime completed_at { get; set; }
        public string status { get; set; }
        public string currency { get; set; }
        public string total { get; set; }
        public string subtotal { get; set; }
        public int total_line_items_quantity { get; set; }
        public string total_tax { get; set; }
        public string total_shipping { get; set; }
        public string cart_tax { get; set; }
        public string shipping_tax { get; set; }
        public string total_discount { get; set; }
        public string shipping_methods { get; set; }
        public PaymentDetails payment_details { get; set; }
        public WooBillingAddress billing_address { get; set; }
        public WooShippingAddress shipping_address { get; set; }
        public string note { get; set; }
        public string customer_ip { get; set; }
        public string customer_user_agent { get; set; }
        public int customer_id { get; set; }
        public string view_order_url { get; set; }
        public List<WooLineItem> line_items { get; set; }
        public List<object> shipping_lines { get; set; }
        public List<object> tax_lines { get; set; }
        public List<object> fee_lines { get; set; }
        public List<object> coupon_lines { get; set; }
        public bool is_vat_exempt { get; set; }
        public WooCustomer customer { get; set; }
    }


  
}
