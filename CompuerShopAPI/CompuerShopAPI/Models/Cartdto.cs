using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CompuerShopAPI.Models
{
    public class Cartdto
    {
        public string PrdName { get; set; }
        public double PrdPrice { get; set; }
        public int PrdQuentity { get; set; }
        public int PrdDiscount { get; set; }
        public int PrdID { get; set; }
        public String UserID { get; set; }


    }
}