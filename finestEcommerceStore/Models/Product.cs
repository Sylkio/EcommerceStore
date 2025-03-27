using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace finestEcommerceStore.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; } // Navigation property
    }
}