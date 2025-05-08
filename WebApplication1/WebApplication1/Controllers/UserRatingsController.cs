using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using WebApplication1.Models.Movie;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRatingsController : ControllerBase
    {
        private readonly MoviesContext _context = new MoviesContext();

        // GET: api/UserRatings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRating>>> GetUserRatings()
        {
            return await _context.UserRatings.ToListAsync();
        }

        // GET: api/UserRatings/{userId}/{movieId}
        [HttpGet("{userId}/{movieId}")]
        public async Task<ActionResult<UserRating>> GetUserRating(int userId, int movieId)
        {
            var userRating = await _context.UserRatings.FindAsync(userId, movieId);

            if (userRating == null)
            {
                return NotFound();
            }

            return userRating;
        }

        // PUT: api/UserRatings/{userId}/{movieId}
        [HttpPut("{userId}/{movieId}")]
        public async Task<IActionResult> PutUserRating(int userId, int movieId, UserRating userRating)
        {
            if (userId != userRating.UserId || movieId != userRating.MovieId)
            {
                return BadRequest();
            }

            _context.Entry(userRating).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserRatingExists(userId, movieId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserRatings
        [HttpPost]
        public async Task<ActionResult<UserRating>> PostUserRating(UserRating userRating)
        {
            _context.UserRatings.Add(userRating);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserRatingExists(userRating.UserId, userRating.MovieId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetUserRating), new { userId = userRating.UserId, movieId = userRating.MovieId }, userRating);
        }

        // DELETE: api/UserRatings/{userId}/{movieId}
        [HttpDelete("{userId}/{movieId}")]
        public async Task<IActionResult> DeleteUserRating(int userId, int movieId)
        {
            var userRating = await _context.UserRatings.FindAsync(userId, movieId);
            if (userRating == null)
            {
                return NotFound();
            }

            _context.UserRatings.Remove(userRating);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserRatingExists(int userId, int movieId)
        {
            return _context.UserRatings.Any(e => e.UserId == userId && e.MovieId == movieId);
        }
    }

}
