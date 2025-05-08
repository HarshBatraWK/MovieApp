namespace WebApplication1.Models.Movie;
public class Genre
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public int MovieId { get; set; }

    public Movies Movie { get; set; }
}
