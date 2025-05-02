using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Models
{
    public class MoviesContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<ViewingHistory> ViewingHistories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=IN83TAAL072K73\\SQLEXPRESS;Database=moviesdb;Trusted_Connection=true;TrustServerCertificate=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Genre>()
                .HasOne(g => g.Movie)
                .WithMany(m => m.Genres)
                .HasForeignKey(g => g.MovieId)
                .OnDelete(DeleteBehavior.Cascade); // Optional: delete genres if movie is deleted
        }

    }
}