using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MoviesContext _context = new MoviesContext();

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
        {
            return await _context.Movies.ToListAsync();
        }

        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);

            if (movie == null)
            {
                return NotFound();
            }

            return movie;
        }

        // PUT: api/Movies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovie(int id, Movie movie)
        {
            if (id != movie.Id)
            {
                return BadRequest();
            }

            _context.Entry(movie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
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

        // POST: api/Movies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Movie>> PostMovie(Movie movie)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovie", new { id = movie.Id }, movie);
        }

        // DELETE: api/Movies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovieExists(int id)
        {
            return _context.Movies.Any(e => e.Id == id);
        }


        [HttpGet("stream/{name}")]
        public async Task<IActionResult> GetVideo(string name)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "data", name+".mp4");

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var fileInfo = new FileInfo(filePath);
            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);

            // Handle range request
            if (Request.Headers.ContainsKey("Range"))
            {
                var rangeHeader = Request.Headers["Range"].ToString();
                var range = rangeHeader.Replace("bytes=", "").Split('-');
                long start = long.Parse(range[0]);
                long end = range.Length > 1 && !string.IsNullOrEmpty(range[1])
                    ? long.Parse(range[1])
                    : fileInfo.Length - 1;
                long length = end - start + 1;

                stream.Seek(start, SeekOrigin.Begin);
                var partialContent = new byte[length];
                await stream.ReadAsync(partialContent, 0, (int)length);

                Response.StatusCode = 206; // Partial content
                Response.ContentType = "video/mp4";
                Response.ContentLength = length;
                Response.Headers.Add("Content-Range", $"bytes {start}-{end}/{fileInfo.Length}");

                return File(new MemoryStream(partialContent), "video/mp4");
            }

            return File(stream, "video/mp4", enableRangeProcessing: true);
        }
    }
}
