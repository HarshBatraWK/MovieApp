using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Models.Movie
{
    public class MoviesContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Movies> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<ViewingHistory> ViewingHistories { get; set; }
        public DbSet<UserRating> UserRatings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=IN83TAAL072K4M\\SQLEXPRESS;Database=moviesdb;Trusted_Connection=true;TrustServerCertificate=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Genre>()
                .HasOne(g => g.Movie)
                .WithMany(m => m.Genres)
                .HasForeignKey(g => g.MovieId)
                .OnDelete(DeleteBehavior.Cascade); // Optional: delete genres if movie is deleted

            modelBuilder.Entity<Movies>()
                .HasOne<ViewingHistory>(m => m.ViewingHistory)
                .WithOne(vh => vh.Movie)
                .HasForeignKey<ViewingHistory>(vh => vh.MovieId);

            modelBuilder.Entity<UserRating>()
                .HasKey(ur => new { ur.UserId, ur.MovieId });
        }

    }
}