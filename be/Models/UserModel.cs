using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace SimpleNotes.Models{
public class User{ 
    [Key]
    public int UserId {get;set;}
    public string Username{get;set;}
    public string Password{get;set;}
}
}
