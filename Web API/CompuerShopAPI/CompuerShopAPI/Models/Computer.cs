using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CompuerShopAPI.Models
{
    public class Computer
    {
        [Key]
        [Required]
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

        public String UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual ApplicationUser User { get; set; }
    }
}