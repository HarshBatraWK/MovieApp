﻿using Microsoft.AspNetCore.Identity;

namespace WebApplication1.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public bool? SubscriptionPlan { get; set; } = null;
    }

}
