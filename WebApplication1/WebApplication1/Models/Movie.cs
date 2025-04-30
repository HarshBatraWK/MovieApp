namespace WebApplication1.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime ReleaseDate { get; set; }
        public int Duration { get; set; } // in minutes
        public bool IsShow { get; set; }
        public string? ThumbnailUrl { get; set; }

        public ICollection<MovieGenre> MovieGenres { get; set; } = new List<MovieGenre>();
        public ICollection<Episode> Episodes { get; set; } = new List<Episode>();
        public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
    }

}
