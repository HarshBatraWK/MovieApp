namespace WebApplication1.Models
{
    public class ViewingHistory
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int MovieId { get; set; }
        public Movie Movie { get; set; } = null!;

        public int? EpisodeId { get; set; }
        public Episode? Episode { get; set; }

        public DateTime WatchedAt { get; set; } = DateTime.UtcNow;
        public float ProgressPercent { get; set; }
    }

}
