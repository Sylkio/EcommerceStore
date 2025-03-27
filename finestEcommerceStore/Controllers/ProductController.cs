using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using finestEcommerceStore.Data;
using finestEcommerceStore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace finestEcommerceStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<ApplicationUser> _userManager; // Add UserManager

        public ProductController(ApplicationDbContext appDbContext, UserManager<ApplicationUser> userManager) // Inject UserManager
        {
            _appDbContext = appDbContext;
            _userManager = userManager;
        }

        [HttpPost("CreateProduct")]
        public async Task<IActionResult> CreateProduct([FromBody] Product product)
        {
            var user = await _userManager.GetUserAsync(User); // Get the logged-in user
            if (user == null)
            {
                return Unauthorized(); // Or return a proper error
            }
            var newProduct = new Product
            {
                Name = product.Name,
                Description = product.Description,
                Price = product.Price
            };

            await _appDbContext.Products.AddAsync(newProduct);
            await _appDbContext.SaveChangesAsync();

            return Ok(newProduct);
        }


        [HttpPost("DeleteProduct")]
        public async Task<IActionResult> DeleteProduct(int Id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }
            var findproduct = await _appDbContext.Products.FirstOrDefaultAsync(p => p.Id == Id && p.UserId == user.Id);

            if (findproduct == null)
            {
                return NotFound("Product not found or you don't have permission to delete it.");
            }
            _appDbContext.Products.Remove(findproduct);
            await _appDbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("UpdateProduct")]
        public async Task<IActionResult> UpdateProduct(int Id, [FromBody] Product product)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _appDbContext.Products.FirstOrDefaultAsync(p => p.Id == product.Id && p.UserId == user.Id); // Check ownership

            if (result != null)
            {
                result.Name = product.Name;
                result.Price = product.Price;
                result.Description = product.Description;
                await _appDbContext.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound("Product not found or you don't have permission to update it.");
            }
        }
        [HttpGet("findproductbyId")]
        public async Task<IActionResult> GetProductById(int Id)
        {
            var result = await _appDbContext.Products.FirstOrDefaultAsync(p => p.Id == Id);
            if (result == null)
            {
                return NotFound($"Product with ID {Id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("GetProduct")]
        public async Task<IActionResult> GetProduct()
        {
            var result = await _appDbContext.Products.ToListAsync();
            return Ok(result);
        }
    }
}