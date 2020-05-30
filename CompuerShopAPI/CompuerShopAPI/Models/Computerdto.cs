using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CompuerShopAPI.Models
{
    public class Computerdto
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public double Price { get; set; }
        public string Img { get; set; }
        public string ModelNumer { get; set; }
        public double Ram { get; set; }
        public int HardDisk { get; set; }
        public int Quentity { get; set; }
        public int Discount { get; set; }
        public string UserID { get; set; }

    }
}