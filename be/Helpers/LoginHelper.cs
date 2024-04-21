using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using SimpleNotes.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using SimpleNotes.Models;

namespace SimpleNotes.Helpers
{
    public class LoginHelper
    {
        private readonly IPasswordHasher<LoginModel> _passwordHasher;

        public LoginHelper(IPasswordHasher<LoginModel> passwordHasher)
        {
            _passwordHasher = passwordHasher;
        }
        public string HashPassword(LoginModel user, string inputPassword)
        {
            string hashedPassword = _passwordHasher.HashPassword(user, inputPassword);
            return hashedPassword;
        }

        public bool VerifyPassword(LoginModel user, string correctPassword)
        {
            PasswordVerificationResult passwordVerificationResult = _passwordHasher.VerifyHashedPassword(user, correctPassword, user.Password);
            if (passwordVerificationResult == PasswordVerificationResult.Success || passwordVerificationResult == PasswordVerificationResult.SuccessRehashNeeded) return true;
            return false;
        }
        public async Task<int> Login(HttpContext httpContext, LoginModel loginModel, int userId)
        {
            List<Claim> claims =
            [
                new Claim("user", loginModel.Username),
                new Claim("id", userId.ToString()),
                new Claim(ClaimTypes.Role, "user"),
            ];
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
            await httpContext.SignInAsync(claimsPrincipal);
            
            return 1;
        }
    }
}