using Microsoft.AspNetCore.Identity;

namespace WebApplication1.Models
{
    public class UserDto
    {
        public string? Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        private readonly PasswordHasher<string> _hasher = new PasswordHasher<string>();

        public string HashPassword()
        {
            return _hasher.HashPassword(Email, Password);
        }

        public bool VerifyPassword(string hashedPassword)
        {
            var result = _hasher.VerifyHashedPassword(Email, hashedPassword, Password);
            return result == PasswordVerificationResult.Success;
        }
    }
}
