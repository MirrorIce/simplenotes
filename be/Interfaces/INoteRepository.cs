using System.Runtime.CompilerServices;
using SimpleNotes.Models;
namespace SimpleNotes.Interfaces
{
    public interface INoteRepository
    {
        ICollection<Models.Note> GetNotes();
        ICollection<Models.Note> GetNotesByUserId(int userId);
        void AddNoteByUserId(Models.Note inputNote);
        void EditNoteById(Models.Note inputNote, Models.Note targetNote);
        void DeleteNoteById(int noteId);
        Models.Note GetNoteById(int noteId);
    }
}