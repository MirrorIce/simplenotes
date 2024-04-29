import Note from "../models/NoteModel";
export interface INoteController{
    getAllNotes(): Note[];
    getNoteById(noteId : number): Note;
    editNote(Note): void;
    addNote(string):number;
    deleteNote(Note): void;
    saveNote(Note): void;
}