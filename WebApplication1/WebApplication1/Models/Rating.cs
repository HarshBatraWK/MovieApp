namespace WebApplication1.Models
{
    public class Rating
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int MovieId { get; set; }
        public Movie Movie { get; set; } = null!;

        public int Score { get; set; } // 1 to 5
        public string? Review { get; set; }
    }

}
