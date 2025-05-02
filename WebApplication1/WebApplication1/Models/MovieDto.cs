namespace WebApplication1.Models
{
    public class MovieDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime ReleaseDate { get; set; }
        public int Duration { get; set; } // in minutes
        public decimal rating { get; set; }
        public bool IsMovie { get; set; }
        public int Episodes { get; set; }
        public bool subscription { get; set; }
        public List<string> Genres { get; set; }
    }
}
