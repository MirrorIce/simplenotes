import { INoteController } from "../interfaces/INoteController";
import NoteModel from "../models/NoteModel";

class LocalStorageNoteController implements INoteController{ 
    getAllNotes(): NoteModel[] {
        let simpleNotes = localStorage.getItem('simplenotes');
        let items : NoteModel[] = null;
        if (simpleNotes !== null)
        {
            items = JSON.parse(simpleNotes);
        }
        return items;
    }

    getNoteById(noteId: number): NoteModel {
        let allNotes : NoteModel[] = this.getAllNotes();
        for (let element of allNotes)
        {
            if (element.noteId === noteId)
            {
                return element;
            }
        }
        return null;

    }
    editNote(Note: any): void {
        throw new Error("Method not implemented.");
    }
    saveNote(Note: any): void {
        let simpleNotes : NoteModel[] = this.getAllNotes();
        if (Note == null) return;
        for (let element of simpleNotes)
        {
            if (element.noteId === Note.noteId)
            {
                element.noteContent = Note.noteContent;
                element.noteTitle = Note.noteTitle;
                localStorage.setItem('simplenotes', JSON.stringify(simpleNotes));
                return;
            }
        }
        alert("Error: note not found to be saved!");
    }
    addNote(newNoteTitle: string): number {
        let simpleNotes : any = localStorage.getItem('simplenotes');
        let newNote : NoteModel = new NoteModel();
        newNote.noteContent = "";
        newNote.noteTitle = newNoteTitle;
        newNote.userId = 0; //It's localstorage, no need for user modelling for the moment
        if (simpleNotes == null)
        {
            newNote.noteId = 0;
            localStorage.setItem('simplenotes', JSON.stringify([newNote]));
            return 0;
        }
        else
        {
            let isFound : boolean = false;
            let parsedSimpleNotes : any = JSON.parse(simpleNotes);
            let maxNoteId = 0;
            for (let element of parsedSimpleNotes)
            {
                if (element["noteId"] != null && element["noteId"] > maxNoteId)
                {
                    maxNoteId = element["noteId"];
                }
                if (newNoteTitle === element["noteTitle"])
                {
                    isFound = true;
                    break;
                }    
            }
            if (!isFound)
            {
                if (newNoteTitle !== "")
                {
                    newNote.noteId = maxNoteId + 1;
                    parsedSimpleNotes.push(newNote);
                    localStorage.setItem('simplenotes', JSON.stringify(parsedSimpleNotes));
                    return 0;   
                }
                else
                {
                    alert("Cannot add an empty note!");
                }
            }
            else
            {
                alert("Note '"+newNoteTitle+"' is already created!");
            }
        }
        return -1;
 
    }
    deleteNote(Note: any): void {
        let simpleNotes = this.getAllNotes();
        if (simpleNotes != null)
        {
            for (let i = 0; i < simpleNotes.length; i++)
            {
                if (simpleNotes[i].noteId === Note.noteId)
                {
                    simpleNotes.splice(i,1);
                    localStorage.setItem('simplenotes',JSON.stringify(simpleNotes));
                }
            }    
        }
    }

}

export default LocalStorageNoteController;