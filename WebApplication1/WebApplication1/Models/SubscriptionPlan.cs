namespace WebApplication1.Models
{
    public class SubscriptionPlan
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public string Resolution { get; set; } = null!;
        public int MaxDevices { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();
    }

}
