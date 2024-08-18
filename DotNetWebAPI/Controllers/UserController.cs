using BCrypt.Net;
using LoginService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoginService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public List<User> GetUsers()
        {
            List<User> users = new List<User>();
            using(var db=new FarmguidedbContext())
            {
                users = db.Users.Include(add=>add.Farmers).ToList();
            }
            return users;
        }

        //This Method is For saving User with its roleid
        [HttpPost]
        public User SaveUser(User user)
        {
            using (var db = new FarmguidedbContext())
            {
                user.Pwd = BCrypt.Net.BCrypt.HashPassword(user.Pwd);
                db.Users.Add(user);
                db.SaveChanges();
            }
            return user;
        }

        [HttpPost]
        public IActionResult VerifyLogin(User user)
        {
            User? userdb;
            using (var db = new FarmguidedbContext())
            {
                userdb = db.Users.Where(u => u.Username == user.Username).FirstOrDefault();
            }
            if (userdb != null && BCrypt.Net.BCrypt.Verify(user.Pwd,userdb.Pwd))
            {
                var response = new
                {
                    userdb.Username,
                    userdb.Pwd,
                    userdb.Rid,
                    userdb.Uid
                };
                return Ok(response);
            }
            return Unauthorized(new {message="Invalid Username or Password"});
        }
    }
}
