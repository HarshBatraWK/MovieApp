
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using WebApplication1.Models.Movie;

namespace WebApplication1.Models
{
    public class UserRating
    {
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public int Rating { get; set; }
        public User? User { get; set; } = null!;
        public Movies? Movie { get; set; } = null!;
    }
}
