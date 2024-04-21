using Microsoft.EntityFrameworkCore;
using SimpleNotes.Models;

namespace SimpleNotes.Data{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
            
        }

        public DbSet<Models.Note> Notes{get; set;}
        public DbSet<Models.User> Users{get; set;}
    }
}