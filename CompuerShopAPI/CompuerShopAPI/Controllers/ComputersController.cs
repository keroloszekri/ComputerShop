using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using CompuerShopAPI.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HttpContext = System.Web.HttpContext;
using HttpRequest = Microsoft.AspNetCore.Http.HttpRequest;

namespace CompuerShopAPI.Controllers
{
    [Authorize]
    public class ComputersController : ApiController
    {
        private ApplicationDBContext db = new ApplicationDBContext();

        [AllowAnonymous]
        public List<Computerdto> GetComputers()
        {
            List<Computerdto> computerListdto = new List<Computerdto>();
            foreach (var item in db.Computers)
            {
                Computerdto computerdto = new Computerdto();
                computerdto.ID = item.ID;
                computerdto.Name = item.Name;
                computerdto.Brand = item.Brand;
                computerdto.Price = item.Price;
                computerdto.Img = item.Img;
                computerdto.Ram = item.Ram;
                computerdto.HardDisk = item.HardDisk;
                computerdto.Quentity = item.Quentity;
                computerdto.Discount = item.Discount;
                computerdto.ModelNumer = item.ModelNumer;

                if (item.UserID != null)
                {
                    computerdto.UserID = item.UserID;
                }
                computerListdto.Add(computerdto);
            }
            return computerListdto;
        }


        public List<Computerdto> GetProfile()
        {
            List<Computerdto> computerListdto = new List<Computerdto>();
            string ProfileID = User.Identity.GetUserId();
            
            foreach (var item in db.Computers.Where(s => s.UserID == ProfileID))
            {
                Computerdto computerdto = new Computerdto();
                computerdto.ID = item.ID;
                computerdto.Name = item.Name;
                computerdto.Brand = item.Brand;
                computerdto.Price = item.Price;
                computerdto.Img = item.Img;
                computerdto.Ram = item.Ram;
                computerdto.HardDisk = item.HardDisk;
                computerdto.Quentity = item.Quentity;
                computerdto.Discount = item.Discount;
                computerdto.ModelNumer = item.ModelNumer;

                if (item.UserID != null)
                {
                    computerdto.UserID = item.UserID;
                }
                computerListdto.Add(computerdto);
            }
            return computerListdto;
        }

        [ResponseType(typeof(Computer))]
        public IHttpActionResult GetComputer(int id)
        {
            Computer computer = db.Computers.Find(id);
            if (computer == null)
            {
                return NotFound();
            }

               Computerdto computerdto = new Computerdto();
                computerdto.ID = computer.ID;
                computerdto.Name = computer.Name;
                computerdto.Brand = computer.Brand;
                computerdto.Price = computer.Price;
                computerdto.Img = computer.Img;
                computerdto.Ram = computer.Ram;
                computerdto.HardDisk = computer.HardDisk;
                computerdto.Quentity = computer.Quentity;
                computerdto.Discount = computer.Discount;
                computerdto.ModelNumer = computer.ModelNumer;

                if (computer.UserID != null)
                {
                    computerdto.UserID = computer.UserID;
                }
         
            return Ok(computerdto);
        }

        [ResponseType(typeof(void))]
        public IHttpActionResult PutComputer(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            Computer newComputer = db.Computers.Find(id);
            string PathImage;
            var httpRequest = HttpContext.Current.Request;
            //newComputer.ID = httpRequest["ID"];

            newComputer.Name = httpRequest["Name"];
            newComputer.Price = double.Parse(httpRequest["Price"]);
            newComputer.Quentity = int.Parse(httpRequest["Quentity"]);
            newComputer.Brand = httpRequest["Brand"];
            newComputer.ModelNumer = httpRequest["ModelNumer"];
            newComputer.Ram = double.Parse(httpRequest["Ram"]);
            newComputer.HardDisk = int.Parse(httpRequest["HardDisk"]);
            newComputer.Discount = int.Parse(httpRequest["Discount"]);
            newComputer.UserID = User.Identity.GetUserId();

            if(httpRequest.Files["Img"] != null)
            {
                var postedFile = httpRequest.Files["Img"];
                PathImage = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "_");
                PathImage += DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                string filePath = "";
                filePath = HttpContext.Current.Server.MapPath("~/Content/" + PathImage);
                newComputer.Img = PathImage;
                postedFile.SaveAs(filePath);
            }

           //db.Entry(computer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                if (!ComputerExists(id))
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


        [ResponseType(typeof(Computer))]
        public IHttpActionResult PostComputer()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Computer newComputer = new Computer();
            string PathImage;
            var httpRequest = HttpContext.Current.Request;
            var postedFile = httpRequest.Files["Img"];
            //newComputer.ID = httpRequest["ID"];
            newComputer.Name = httpRequest["Name"];
            newComputer.Price = double.Parse(httpRequest["Price"]);
            newComputer.Quentity = int.Parse(httpRequest["Quentity"]);
            newComputer.Brand = httpRequest["Brand"];
            newComputer.ModelNumer = httpRequest["ModelNumer"];
            newComputer.Ram = double.Parse(httpRequest["Ram"]);
            newComputer.HardDisk = int.Parse(httpRequest["HardDisk"]);
            newComputer.Discount = int.Parse(httpRequest["Discount"]);
            newComputer.UserID = User.Identity.GetUserId();
            PathImage = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            PathImage += DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);

            string filePath = "";

            filePath = HttpContext.Current.Server.MapPath("~/Content/" + PathImage);
            newComputer.Img = PathImage;
            postedFile.SaveAs(filePath);
            db.Computers.Add(newComputer);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ComputerExists(newComputer.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = newComputer.ID }, newComputer);
        }

        [ResponseType(typeof(Computer))]
        public IHttpActionResult DeleteComputer(int id)
        {
            Computer computer = db.Computers.Find(id);
            if (computer == null)
            {
                return NotFound();
            }
           
            //Delete Image From File
            string filePath = HttpContext.Current.Server.MapPath("~/Content/" + computer.Img);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
           
            db.Computers.Remove(computer);
            db.SaveChanges();

            return Ok(computer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ComputerExists(int id)
        {
            return db.Computers.Count(e => e.ID == id) > 0;
        }

        //public string UploadFile()
        //{
        //    var filename = "";
        //    HttpResponseMessage response = new HttpResponseMessage();
        //    var httpRequest = HttpContext.Current.Request;
        //    if (httpRequest.Files.Count > 0)
        //    {
        //        foreach (string file in httpRequest.Files)
        //        {
        //            var postedFile = httpRequest.Files[file];
        //            var filePath = HttpContext.Current.Server.MapPath("~/App_Data/" + postedFile.FileName);
        //            filename = postedFile.FileName;
        //            postedFile.SaveAs(filePath);
        //        }
        //    }
        //    return filename;
        //}

    }
}