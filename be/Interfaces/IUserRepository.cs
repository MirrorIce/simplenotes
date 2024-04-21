using SimpleNotes.Models;

namespace SimpleNotes.Interfaces
{
    public interface IUserRepository
    {
        public User? GetUserByUsernameAndPassword(string username, string password);
        public User? GetUserByUsername(string username);
        public User? GetUserById(int id);
        public Task<User?> CreateUser(User user);
    }
}