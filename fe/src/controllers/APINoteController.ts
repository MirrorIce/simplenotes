import { INoteController } from "../interfaces/INoteController";
import NoteModel from "../models/NoteModel";

class APINoteController implements INoteController {
    URI = "/";
    async getAllNotes(): Promise<NoteModel[]> {
        let result = await fetch(this.URI + "api/note/User/notes", {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Sec-Fetch-Site": "cross-site"
            }
        });
        if (result.status === 200) {
            let output: NoteModel[] = await result.json();
            return output;
        }
        else return null;
    }
    async getNoteById(noteId: number): Promise<NoteModel> {
        let result = await fetch(this.URI + `api/Note/${noteId}`, {
            method: "GET",
            credentials: "include"

        });
        let output: NoteModel = await result.json();
        return new Promise((resolve, _reject) => {
            resolve(output);
        });
    }

    async saveNote(Note: any): Promise<void> {
        if (Note == null) return;

        let result = await fetch(this.URI + `api/Note`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Note),
            credentials: "include"
        });

        if (result.status !== 200) {
            console.log(result.body);
            alert("Could not save note!");
        }
    }

    async addNote(newNoteTitle: string): Promise<number> {
        if (newNoteTitle === null || newNoteTitle == "") {
            alert("Cannot add an empty note!");
            return -1;
        }
        let requestBody = new NoteModel();
        requestBody.noteTitle = newNoteTitle;
        requestBody.userId = -1;
        requestBody.noteContent = "";
        let result = await fetch(this.URI + "api/Note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody),
            credentials: "include"
        });

        if (result.status === 200) {
            return new Promise((resolve, _reject) => {
                resolve(0);
            })
        }
        return -1;

    }

    async deleteNote(Note: any): Promise<void> {
        if (Note == null) return;

        let result = await fetch(this.URI + `api/Note`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Note),
            credentials: "include"
        });

        if (result.status !== 200) {
            result.json().then((res) =>{
                console.log(res);
            })
            alert("Could not delete note!");
        }

        return new Promise((resolve, reject) =>{
            resolve();
        })
    }

    async searchNoteTitleByText(queryText: string): Promise<NoteModel[]> {
        if (queryText == null) {
            alert("An error occured!");
            return null;
        }

        let result = await fetch(this.URI + `api/Note/noteByTitle?title=${queryText}`);
        if (result.status !== 200) {
            console.log(result.body);
            alert("An error occured!");
        }

        let output: NoteModel[] = await result.json();
        return new Promise((resolve, _reject) => {
            resolve(output);
        })
    }
    async searchNoteContentByText(queryText: string): Promise<NoteModel[]> {
        if (queryText == null) {
            alert("An error occured!");
            return null;
        }

        let result = await fetch(this.URI + `api/Note/noteByContent?content=${queryText}`);
        if (result.status !== 200) {
            console.log(result.body);
            alert("An error occured!");
        }

        let output: NoteModel[] = await result.json();
        return new Promise((resolve, _reject) => {
            resolve(output);
        })
    }
}

export { APINoteController };