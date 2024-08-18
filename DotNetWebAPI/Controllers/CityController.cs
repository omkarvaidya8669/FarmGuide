using LoginService.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LoginService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors]
    public class CityController : ControllerBase
    {
        [HttpGet("{id}")]
        public City GetCity(int id)
        {
            City city = null;
            using (var db = new FarmguidedbContext())
            {
                city = db.Cities.Find(id);
            }
            if (city == null)
            {
                return city;
            }
            return city;
        }
    }
}
