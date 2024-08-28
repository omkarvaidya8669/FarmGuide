using LoginService.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoginService.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors]
    [ApiController]
    public class FarmerController : ControllerBase
    {
        [HttpGet]
        public List<Farmer> GetFarmers()
        {
            List<Farmer> farmers = new List<Farmer>();
            using (var db = new FarmguidedbContext())
            {
                farmers = db.Farmers.Include(c=>c.City).ToList();
            }
            return farmers;
        }

        [HttpPost]
        public dynamic SaveFarmer(Farmer farmer)
        {
            using (var db = new FarmguidedbContext())
            {

                try
                {
                    farmer.UidNavigation.Pwd = BCrypt.Net.BCrypt.HashPassword(farmer.UidNavigation.Pwd);
                    db.Farmers.Add(farmer);
                    db.SaveChanges();
        }
                catch (Exception)
                {
                    return " Already exists!";

                }
            }
            return farmer;
        }

        [HttpGet("{id}")]
        public ActionResult<Farmer> GetFarmerById(int id)
        {
            using (var db = new FarmguidedbContext())
            {
                var farmer = db.Farmers.FirstOrDefault(f => f.Uid == id);
                if (farmer == null)
                {
                    return NotFound();
                }
                return farmer;
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Farmer> GetFarmerByFid(int id)
        {
            using (var db = new FarmguidedbContext())
            {
                var farmer = db.Farmers.FirstOrDefault(f => f.Fid == id);
                if (farmer == null)
                {
                    return NotFound();
                }
                return farmer;
            }
        }
        /* {
           "fname": "Omkar",
           "lname": "Vaidya",
           "aadharNo": 27052869,
           "address": "Jsp",
           "cityid": 2,
           "email": "omkar123@gmail.com",
           "mobileNo": 8669456798,
           "uidNavigation": {
             "username": "omvv",
             "pwd": "omvv",
             "rid": 1,
             "status": 1
             }
         }*/
    }
}
