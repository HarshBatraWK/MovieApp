namespace WebApplication1.Models
{
    public class Episode
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; } = null!;

        public int SeasonNumber { get; set; }
        public int EpisodeNumber { get; set; }
        public string Title { get; set; } = null!;
        public int Duration { get; set; } // in minutes
        public DateTime ReleaseDate { get; set; }
    }

}
