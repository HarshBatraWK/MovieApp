namespace WebApplication1.Models
{
    public class Genre
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public int MovieId { get; set; }

        public Movie Movie { get; set; }
    }

}
