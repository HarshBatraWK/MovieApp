using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models.Movie;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewingHistoriesController : ControllerBase
    {
        private readonly MoviesContext _context = new MoviesContext();

        // GET: api/ViewingHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViewingHistory>>> GetViewingHistories()
        {
            return await _context.ViewingHistories
                    .Include(vh => vh.Movie)
                    .Include(vh => vh.User)
                    .ToListAsync();
        }

        // GET: api/ViewingHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ViewingHistory>> GetViewingHistory(int id)
        {
            var viewingHistory = await _context.ViewingHistories.FindAsync(id);

            if (viewingHistory == null)
            {
                return NotFound();
            }

            return viewingHistory;
        }

        // PUT: api/ViewingHistories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutViewingHistory(int id, ViewingHistory viewingHistory)
        {
            if (id != viewingHistory.MovieId)
            {
                return BadRequest();
            }

            _context.Entry(viewingHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ViewingHistoryExists(id))
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

        // POST: api/ViewingHistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ViewingHistory>> PostViewingHistory(ViewingHistory viewingHistory)
        {
            _context.ViewingHistories.Add(viewingHistory);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ViewingHistoryExists(viewingHistory.MovieId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetViewingHistory", new { id = viewingHistory.MovieId }, viewingHistory);
        }

        // DELETE: api/ViewingHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteViewingHistory(int id)
        {
            var viewingHistory = await _context.ViewingHistories.FindAsync(id);
            if (viewingHistory == null)
            {
                return NotFound();
            }

            _context.ViewingHistories.Remove(viewingHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ViewingHistoryExists(int id)
        {
            return _context.ViewingHistories.Any(e => e.MovieId == id);
        }
    }
}
