import Note from "../models/NoteModel";
export interface INoteController{
    getAllNotes(): Promise<Note[]>;
    getNoteById(noteId : number): Promise<Note>;
    addNote(string):Promise<number>;
    deleteNote(Note): void;
    saveNote(Note): void;
}