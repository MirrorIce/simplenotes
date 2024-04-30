/* eslint-disable react-hooks/exhaustive-deps */
import {useState,useEffect, useContext} from 'react';
import { ActiveNoteContext, ControllersContext } from '../App';
import ContextModel from '../models/ContextModel';

function NotesContent(props) {
    let [title,setTitle] = useState<string>('');
    let [content,setContent] = useState<string>('');
    let controllerContext = useContext(ControllersContext);
    let activeNoteIdContext = useContext(ActiveNoteContext);

    function saveNote(event){
        if (activeNoteIdContext.activeNoteId !== -1)
        {
            let noteToEdit = controllerContext.controllerContext._noteController.getNoteById(activeNoteIdContext.activeNoteId);
            setContent(event.target.value);
            noteToEdit.noteContent = event.target.value;
            controllerContext.controllerContext._noteController.saveNote(noteToEdit);
            props.useReload(!props.reload);
        }        
        else
        {
            alert("No note was selected!");
        }
    }

    function editTitle(event){
        setTitle(event.target.value);
        let noteToEdit =  controllerContext.controllerContext._noteController.getNoteById(activeNoteIdContext.activeNoteId);
        noteToEdit.noteTitle = event.target.value;
        controllerContext.controllerContext._noteController.saveNote(noteToEdit);
        props.useReload(!props.reload);
    }

    function removeNote(event){
        if (activeNoteIdContext.activeNoteId === -1)
        {
            alert("No notes selected!");
            return;
        }
        let noteToDelete = controllerContext.controllerContext._noteController.getNoteById(activeNoteIdContext.activeNoteId);
        if (noteToDelete == null)
        {
            alert("Error: could not find note to delete!");
            return;
        }
        controllerContext.controllerContext._noteController.deleteNote(noteToDelete);
        activeNoteIdContext.setActiveNoteId(-1);
        props.useReload(!props.reload);
    }

    useEffect(() =>{
        if (document.querySelector('.noteInput')!=null){
            if (activeNoteIdContext.activeNoteId !== -1)
            {
                let note = controllerContext.controllerContext._noteController.getNoteById(activeNoteIdContext.activeNoteId);
                if (note === null)
                {
                    setTitle("");
                    setContent("");
                    return;
                }
                setTitle(note.noteTitle);
                setContent(note.noteContent);
            }
            else
            {
                setTitle("");
                setContent("");
            }
        }   
    },[activeNoteIdContext.activeNoteId]);

    return (
        <div className = 'notesContent'>
            <input onChange={editTitle} type="text" value={title}></input>
            <button className="deleteButton" onClick={removeNote} >X</button>
            {(activeNoteIdContext.activeNoteId !== -1)&&<textarea className='noteInput' onChange={saveNote} value={content}></textarea>}
        </div>
    )
}

export default NotesContent;
