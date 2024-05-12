import { INoteController } from "../interfaces/INoteController";
import NoteModel from "../models/NoteModel";

class LocalStorageNoteController implements INoteController {
    getAllNotes(): Promise<NoteModel[]> {
        let simpleNotes = localStorage.getItem('simplenotes');
        let items: NoteModel[] = null;
        if (simpleNotes !== null) {
            items = JSON.parse(simpleNotes);
        }
        return new Promise((resolve, _reject) => {
            resolve(items)
        });
    }

    async getNoteById(noteId: number): Promise<NoteModel> {
        let allNotes: NoteModel[] = await this.getAllNotes();
        for (let element of allNotes) {
            if (element.noteId === noteId) {
                return new Promise((resolve, _reject) => {
                    resolve(element);
                });
            }
        }
        return new Promise((resolve, _reject) => { resolve(null) });

    }

    async saveNote(Note: any): Promise<void> {
        let simpleNotes: NoteModel[] = await this.getAllNotes();
        if (Note == null) return;
        for (let element of simpleNotes) {
            if (element.noteId === Note.noteId) {
                element.noteContent = Note.noteContent;
                element.noteTitle = Note.noteTitle;
                localStorage.setItem('simplenotes', JSON.stringify(simpleNotes));
                return;
            }
        }
        alert("Error: note not found to be saved!");
    }
    async addNote(newNoteTitle: string): Promise<number> {
        let simpleNotes: any = localStorage.getItem('simplenotes');
        let newNote: NoteModel = new NoteModel();
        newNote.noteContent = "";
        newNote.noteTitle = newNoteTitle;
        newNote.userId = 0; //It's localstorage, no need for user modelling for the moment
        if (simpleNotes == null) {
            newNote.noteId = 0;
            localStorage.setItem('simplenotes', JSON.stringify([newNote]));
            return 0;
        }
        else {
            let isFound: boolean = false;
            let parsedSimpleNotes: any = JSON.parse(simpleNotes);
            let maxNoteId = 0;
            for (let element of parsedSimpleNotes) {
                if (element["noteId"] != null && element["noteId"] > maxNoteId) {
                    maxNoteId = element["noteId"];
                }
                if (newNoteTitle === element["noteTitle"]) {
                    isFound = true;
                    break;
                }
            }
            if (!isFound) {
                if (newNoteTitle !== "") {
                    newNote.noteId = maxNoteId + 1;
                    parsedSimpleNotes.push(newNote);
                    localStorage.setItem('simplenotes', JSON.stringify(parsedSimpleNotes));
                    return 0;
                }
                else {
                    alert("Cannot add an empty note!");
                }
            }
            else {
                alert("Note '" + newNoteTitle + "' is already created!");
            }
        }
        return -1;

    }
    async deleteNote(Note: any): Promise<void> {
        let simpleNotes = await this.getAllNotes();
        if (simpleNotes != null) {
            for (let i = 0; i < simpleNotes.length; i++) {
                if (simpleNotes[i].noteId === Note.noteId) {
                    simpleNotes.splice(i, 1);
                    localStorage.setItem('simplenotes', JSON.stringify(simpleNotes));
                }
            }
        }
    }

    async searchNoteTitleByText(queryText: string): Promise<NoteModel[]> {
        let allNotes = await this.getAllNotes();
        let result = [];

        for (let note of allNotes)
        {
            let lowerCaseNote = note.noteTitle.toLowerCase();
            if (lowerCaseNote.includes(queryText.toLowerCase()))
            {
                result.push(note);
            }
        }

        return new Promise((resolve, _reject) => {
            resolve(result);
        })
    }
    async searchNoteContentByText(queryText: string): Promise<NoteModel[]> {
        let allNotes = await this.getAllNotes();
        let result = [];

        for (let note of allNotes)
        {
            if (note.noteContent.toLowerCase().includes(queryText.toLowerCase()))
            {
                result.push(note);
            }
        }

        return new Promise((resolve, _reject) =>{
            resolve(result);
        })
    }
}

export default LocalStorageNoteController;