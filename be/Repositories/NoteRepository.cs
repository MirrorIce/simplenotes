using SimpleNotes.Interfaces;
using SimpleNotes.Data;
using SimpleNotes.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace SimpleNotes.Repositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly DataContext _ctx;
        public NoteRepository(DataContext ctx)
        {
            _ctx = ctx;
        }
        public Note GetNoteById(int noteId)
        {
           IEnumerable<Note> noteQuery = _ctx.Notes.Where<Note>(note => note.NoteId == noteId);
           if (noteQuery.Count() > 0)
           {
                return noteQuery.First();
           }
           else
           {
            return null;
           }
        }

        public void AddNoteByUserId(Note inputNote)
        {
            if (inputNote == null || inputNote.UserId < 0 || String.IsNullOrEmpty(inputNote.NoteTitle)) return;

            _ctx.Notes.Add(inputNote);
            _ctx.SaveChanges();
        }

        public void DeleteNoteById(int noteId)
        {
            if (noteId < 0) return;
            Note? existingNote = _ctx.Notes.FirstOrDefault<Note>(note => note.NoteId == noteId);
            if (null == existingNote) return;

            _ctx.Notes.Remove(existingNote);
            _ctx.SaveChanges();
        }
        public void EditNoteById(Note inputNote, Note targetNote)
        {
            if (inputNote == null || inputNote.UserId < 0 || String.IsNullOrEmpty(inputNote.NoteTitle) || inputNote.NoteId < 0) return;


            targetNote.NoteTitle = !String.IsNullOrEmpty(inputNote.NoteTitle) ? inputNote.NoteTitle : targetNote.NoteTitle;
            targetNote.NoteContent = !String.IsNullOrEmpty(inputNote.NoteContent) ? inputNote.NoteContent : targetNote.NoteContent;

            _ctx.Notes.Update(targetNote);
            _ctx.SaveChanges();
        }

        public ICollection<Note> GetNotes()
        {
            return _ctx.Notes.ToList();
        }

        public ICollection<Note> GetNotesByUserId(int userId)
        {
            if (userId < 0) return null;
            ICollection<Note> noteQuery = _ctx.Notes.Where<Note>(note => note.UserId == userId).ToList();
            if (noteQuery.Count() > 0)
            {
                return noteQuery;
            }
            else
            {
                return null;
            }
        }
    }
}