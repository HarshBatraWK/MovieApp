using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using WebApplication1.Models.Movie;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MoviesContext _context = new MoviesContext();

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movies>>> GetMovies()
        {
            return await _context.Movies.ToListAsync();
        }

        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movies>> GetMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);

            if (movie == null)
            {
                return NotFound();
            }

            return movie;
        }

        [HttpGet("byGenre/{genre}")]
        public async Task<ActionResult<IEnumerable<MovieGenreDto>>> GetMoviesByGenre(string genre)
        {
            string sqlQuery = @"SELECT m.Id, m.Title, m.Description, m.ReleaseDate, m.Duration, 
                            m.Rating, m.IsMovie, m.Episodes, m.Subscription
                            FROM 
                                Movies m
                            JOIN 
                                Genres g ON m.Id = g.MovieId
                            WHERE 
                                g.Name = {0}";

            List<MovieGenreDto> movieList = await _context.Database
                .SqlQueryRaw<MovieGenreDto>(sqlQuery, genre)
                .ToListAsync();

            //var result = from m in _context.Movies
            //             join g in _context.Genres on m.Id equals g.MovieId
            //             where g.Name == genre  // genreName is the parameter for the genre name you're filtering by
            //             select new
            //             {
            //                 m.Id,
            //                 m.Title,
            //                 m.Description,
            //                 m.ReleaseDate,
            //                 m.Duration,
            //                 m.IsMovie,
            //                 m.Episodes
            //             };

            //var movieList = await result.ToListAsync();
            return Ok(movieList);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Movies>>> SearchMovies(string name, int userId, int rating, int duration)
        {
            var User = await _context.Users.FindAsync(userId);

            var movies = await _context.Movies
                .Where(m => m.Title.ToLower().Contains(name.ToLower()))
                .Where(m => m.subscription == User.SubscriptionPlan || m.subscription==false)
                .Where(m => m.rating >= rating)
                .Where(m => m.Duration >= duration)
                .ToListAsync();

            return Ok(movies);
        }

        // PUT: api/Movies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovie(int id, MovieDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            var movie = new Movies
            {
                Id = id,
                Title = dto.Title,
                Description = dto.Description,
                ReleaseDate = dto.ReleaseDate,
                Duration = dto.Duration,
                rating = dto.rating,
                IsMovie = dto.IsMovie,
                Episodes = dto.Episodes,
                subscription = dto.subscription,
                ImageUrl = dto.ImageUrl,
                VideoUrl = dto.VideoUrl,
                Genres = dto.Genres.Select(g => new Genre { Name = g }).ToList()
            };

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


        [HttpPost]
        public async Task<ActionResult<MovieDto>> PostMovie(MovieDto dto)
        {
            // Create movie entity
            var movie = new Movies
            {
                Title = dto.Title,
                Description = dto.Description,
                ReleaseDate = dto.ReleaseDate,
                Duration = dto.Duration,
                rating = dto.rating,
                IsMovie = dto.IsMovie,
                Episodes = dto.Episodes,
                subscription = dto.subscription,
                ImageUrl = dto.ImageUrl,
                VideoUrl = dto.VideoUrl,
                Genres = dto.Genres.Select(g => new Genre { Name = g }).ToList()
            };

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            // Map result to a read DTO to avoid circular serialization
            var result = new MovieDto
            {
                Id = movie.Id,
                Title = movie.Title,
                Description = movie.Description,
                ReleaseDate = movie.ReleaseDate,
                Duration = movie.Duration,
                rating = movie.rating,
                IsMovie = movie.IsMovie,
                Episodes = movie.Episodes,
                subscription = movie.subscription,
                Genres = movie.Genres.Select(g => g.Name).ToList()
            };

            return CreatedAtAction(nameof(GetMovie), new { id = movie.Id }, result);
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

        [HttpGet("video/{name}")]
        public async Task<IActionResult> GetVideo(string name)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "data/video", name);

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


        [HttpGet("image/{name}")]
        public async Task<IActionResult> GetImage(string name)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "data/image", name);

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var fileInfo = new FileInfo(filePath);
            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);

            return File(stream, "image/jpg", enableRangeProcessing: true);
        }


        [HttpPost("uploadData")]
        public async Task<IActionResult> UploadImage(IFormFile file,[FromForm] bool isImage)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file selected.");

            string dataPath = isImage ? "image" : "video";

            string uploadsFolder = Path.Combine($"C:\\movie app\\MovieApp\\WebApplication1\\WebApplication1\\data\\{dataPath}\\");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            string dataUrl = $"http://localhost:5199/api/Movies/{dataPath}/{uniqueFileName}";
            return Ok(new { Url = dataUrl });
        }
    }
}
