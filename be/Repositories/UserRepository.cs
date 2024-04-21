using System.Diagnostics;
using System.Linq.Expressions;
using SimpleNotes.Data;
using SimpleNotes.Interfaces;
using SimpleNotes.Models;

namespace SimpleNotes.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _ctx;

        public UserRepository(DataContext ctx)
        {
            _ctx = ctx;
        }

        public User? GetUserByUsernameAndPassword(string username, string password)
        {
            User? user = null;
            if (String.IsNullOrEmpty(username) || String.IsNullOrEmpty(password))
            {
                return null;
            }
            try
            {
                user = _ctx.Users.Where<User>(usr => usr.Username == username && usr.Password == password )
                                 .FirstOrDefault();   
            }
            catch(Exception e)
            {
                string msg = $"Could not fetch user: {e}";
                Trace.TraceError(msg);
            }

            if (user == null)
            {
                string msg = $"User not found!";
            }

            return user;
        }

        public User? GetUserByUsername(string username)
        {
            User? user = null;
            if (String.IsNullOrEmpty(username))
            {
                return null;
            }

            try
            {
                user = _ctx.Users.Where<User>(usr => usr.Username == username).FirstOrDefault();
            }
            catch(Exception  e)
            {
                string msg = $"Could not fetch user: {e}";
                Trace.TraceError(msg);
            }

            return user;
        }

        public async Task<User?> CreateUser(User user)
        {
            if (String.IsNullOrEmpty(user.Username) || String.IsNullOrEmpty(user.Password))
            {
                return null;
            }
            try
            {
                await _ctx.AddAsync(user);
                _ctx.SaveChanges();
                return user;
            }
            catch(Exception e)
            {
                Trace.TraceError($"An error has occured! {e.Message}");
                return null;
            }
        }

        public User? GetUserById(int userId)
        {
            if (userId < 0) return null;
            try
            {
                User? user = _ctx.Users.Where<User>(usr => usr.UserId == userId).FirstOrDefault();
                return user; 
            }
            catch(Exception e)
            {
                string msg = $"Could not get user with id {userId}, {e.Message}";
                Trace.TraceError(msg);
                return null;
            }
        }
    }
}