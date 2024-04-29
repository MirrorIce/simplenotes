import { INoteController } from "../interfaces/INoteController";
import NoteModel from "../models/NoteModel";

class APINoteController implements INoteController{
    saveNote(Note: any): void {
        throw new Error("Method not implemented.");
    }
    
    getAllNotes(): NoteModel[] {
        throw new Error("Method not implemented.");
    }
    getNoteById(noteId: number): NoteModel {
        throw new Error("Method not implemented.");
    }
    editNote(Note: any): void {
        throw new Error("Method not implemented.");
    }
    addNote(newNoteTitle: string): number {
        throw new Error("Method not implemented.");
    }
    deleteNote(Note: any): void {
        throw new Error("Method not implemented.");
    }

}

export {APINoteController};