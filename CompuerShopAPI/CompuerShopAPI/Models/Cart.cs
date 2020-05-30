using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CompuerShopAPI.Models
{
    public class Cart
    {
        //public int ID { get; set; }
        public string PrdName { get; set; }
        public double PrdPrice { get; set; }
        public int PrdQuentity { get; set; }
        public int PrdDiscount { get; set; }

        [Key]
        [Column(Order = 1)]
        public int PrdID { get; set; }
        [ForeignKey("PrdID")]
        public virtual Computer Computer { get; set; }

        [Key]
        [Column(Order = 2)]
        public String UserID { get; set; }
        [ForeignKey("UserID")]
        public virtual ApplicationUser User { get; set; }
    }
}