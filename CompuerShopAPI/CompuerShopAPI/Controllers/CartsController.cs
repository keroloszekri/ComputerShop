using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CompuerShopAPI.Models;
using Microsoft.AspNet.Identity;

namespace CompuerShopAPI.Controllers
{
    [Authorize]
    public class CartsController : ApiController
    {
        private ApplicationDBContext db = new ApplicationDBContext();

        // GET: api/Carts/GetCarts
        public IQueryable<Cart> GetCarts()
        {
            return db.Carts;
        }

        //get own cart
        public List<Cartdto> GetOwnCart()
        {
            List<Cartdto> cartListdto = new List<Cartdto>();
            string UserCardID = User.Identity.GetUserId();

            foreach (var item in db.Carts.Where(s => s.UserID == UserCardID))
            {
                Cartdto cartdto = new Cartdto();
                cartdto.PrdID = item.PrdID;
                cartdto.PrdName = item.PrdName;
                cartdto.PrdPrice = item.PrdPrice;
                cartdto.PrdQuentity = item.PrdQuentity;
                cartdto.PrdDiscount = item.PrdDiscount;
                if (item.UserID != null)
                {
                    cartdto.UserID = item.UserID;
                }
                cartListdto.Add(cartdto);
            }
            return cartListdto;
        }


        [ResponseType(typeof(Cart))]
        public IHttpActionResult GetCart(int id)
        {
            Cart cart = db.Carts.Find(id);
            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart);
        }

        [HttpPut]
        [Route("PutCart/{prdId:int}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCart(int prdId ,Cart cart2)
        {
            string UserCardID = User.Identity.GetUserId();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Cart cart = db.Carts.Where(e => e.PrdID == prdId && e.UserID== UserCardID).FirstOrDefault();
            if (prdId != cart.PrdID || UserCardID != cart.UserID)
            {
                return BadRequest();
            }
            cart.PrdQuentity = cart2.PrdQuentity;
            db.Entry(cart).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(prdId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [ResponseType(typeof(Cart))]
        public IHttpActionResult PostCart(Cart cart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            cart.UserID = User.Identity.GetUserId();
            cart.PrdQuentity = 1;
            db.Carts.Add(cart);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CartExists(cart.PrdID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = cart.PrdID }, cart);
        }

        [Route("DeleteCart/{prdId:int}")]
        [ResponseType(typeof(Cart))]
        public IHttpActionResult DeleteCart(int prdID)
        {            
            string UserCardID = User.Identity.GetUserId();
            Cart cart = db.Carts.Where(e => e.PrdID == prdID && e.UserID == UserCardID).FirstOrDefault();
            if (cart == null)
            {
                return NotFound();
            }
            if (cart.UserID != UserCardID)
            {
                return BadRequest();
            }
            db.Carts.Remove(cart);
            db.SaveChanges();

            return Ok(cart);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CartExists(int id)
        {
            return db.Carts.Count(e => e.PrdID == id) > 0;
        }
    }
}