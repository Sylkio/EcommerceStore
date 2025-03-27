using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace finestEcommerceStore.Models
{
    public class RegisterUserDto
    {
        public string Password { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}