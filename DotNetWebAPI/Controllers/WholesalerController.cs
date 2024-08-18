using LoginService.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LoginService.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors]
    [ApiController]
    public class WholesalerController : ControllerBase
    {  
        [HttpGet]
        public List<Wholesaler> GetWholesellers()
        {
            List<Wholesaler> wholesalers = new List<Wholesaler>();
            using (var db = new FarmguidedbContext())
            {
                wholesalers = db.Wholesalers.Include(c => c.City).ToList();
            }
            return wholesalers;
        }

        [HttpPost]
        public dynamic SaveWholesaler(Wholesaler wholesaler)
        {
            using (var db = new FarmguidedbContext())
            {

                try
                {
                   wholesaler.UidNavigation.Pwd = BCrypt.Net.BCrypt.HashPassword(wholesaler.UidNavigation.Pwd);
                    db.Wholesalers.Add(wholesaler);
                    db.SaveChanges();
        }
                catch (Exception)
                {
                    return " Already exists!";

                }
            }
            return wholesaler;
        }

        [HttpGet("{id}")]
        public ActionResult<Wholesaler> GetWholesalerById(int id)
        {
            using (var db = new FarmguidedbContext())
            {
                var wholesaler = db.Wholesalers.FirstOrDefault(w => w.Uid == id);
                if (wholesaler == null)
                {
                    return NotFound();
                }
                return wholesaler;
            }
        }
    }
}