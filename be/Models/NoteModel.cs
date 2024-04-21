using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace SimpleNotes.Models{
public class Note{
    [Key]
    public int NoteId{get; set;}
    public string NoteTitle{get; set;}
    public string NoteContent{get; set;}
    [ForeignKey("User")]
    public int UserId {get; set;}  
}
}
