using System.Diagnostics;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SimpleNotes.Helpers;
using SimpleNotes.Interfaces;
using SimpleNotes.Models;
using SimpleNotes.Repositories;

namespace SimpleNotes.Controllers{

    [ApiController]
    [Route("/api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher<LoginModel> _passwordHasher;
        private LoginHelper loginHelper;

        public UserController(IUserRepository userRepository, IPasswordHasher<LoginModel> passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            loginHelper = new LoginHelper(passwordHasher);
        }
        [HttpGet]
        public IActionResult GetUserById(int userId)
        {
            if (userId < 0)
            {
                return BadRequest("User not found!");
            }
            try
            {
                User? user = _userRepository.GetUserById(userId);
                if (user == null)
                {
                    return BadRequest("User not found!");
                }
                return Ok(user);
            }
            catch(Exception e)
            {
                string msg = $"An error occured: {e.Message}";
                Trace.TraceError(msg);
                return StatusCode(500);
            }
        }  

        [HttpPost("loginbyuserpass"), AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel content)
        {
            Models.LoginModel? loginModel = content;            

            if (content == null || String.IsNullOrEmpty(content.Username) || String.IsNullOrEmpty(content.Password))
            {
                Trace.TraceError("Invalid input data!");
                return BadRequest("Invalid data!");
            }
            User? loginUser = _userRepository.GetUserByUsername(loginModel.Username);
            if (loginUser == null)
            {
                return NotFound("User not found!");
            }

            bool isPasswordCorrect = loginHelper.VerifyPassword(content, loginUser.Password);
            if (!isPasswordCorrect)
            {
                Trace.TraceError("Incorrect pass!");
                return BadRequest("Username or password are incorrect!");
            }
            try
            {
                await loginHelper.Login(HttpContext, content, loginUser.UserId);
                return Ok("User signed in");
            }
            catch(Exception e)
            {
                Trace.TraceError($"Something went wrong with signing in {e.Message}");
                return BadRequest("Login went wrong");
            }
        } 

        [HttpPost("signupbyuserpass"), AllowAnonymous]
        public async Task<IActionResult> SignUp([FromBody] LoginModel content)
        {
            Models.LoginModel? loginModel = content;            

            if (content == null || String.IsNullOrEmpty(content.Username) || String.IsNullOrEmpty(content.Password))
            {
                Trace.TraceError("Invalid input data!");
                return BadRequest("Invalid data!");
            }
            User? loginUser = _userRepository.GetUserByUsername(loginModel.Username);
            if (loginUser != null)
            {
                return BadRequest("User already in database!");
            }

            string hashedPassword = _passwordHasher.HashPassword(content, content.Password);
            User newUser = new User()
            {
                Username = content.Username,
                Password = hashedPassword
            };

            User? newUserResult = await _userRepository.CreateUser(newUser);
            if (newUserResult != null)
            {
                return Ok("New user created!");
            }
            else
            {
                return StatusCode(500, "Failed to create new user!");
            }
        }
    }
} 