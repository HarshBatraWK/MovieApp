using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Movie
{
    public class ViewingHistory
    {
        [Key]
        [ForeignKey("Movie")]
        public int MovieId { get; set; }

        public float ProgressPercent { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; } = null!;

        public Movies? Movie { get; set; } = null!;
    }

}
