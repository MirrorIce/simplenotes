/* eslint-disable react-hooks/exhaustive-deps */
import {useState,useEffect, useContext, useRef} from 'react';
import { ActiveNoteContext, ControllersContext } from '../App';
import useInterval from '../helpers/useInterval';

function NotesContent(props) {
    let [title,setTitle] = useState<string>('');
    let [content,setContent] = useState<string>('');
    let controllerContext = useContext(ControllersContext);
    let activeNoteIdContext = useContext(ActiveNoteContext);
    let [currentTick, setCurrentTick] = useState(0);
    let [saveTick, setSaveTick] = useState(0);
    let previousActiveId = useRef<number>(-1);

    function editNoteContents(event){
        if (activeNoteIdContext.activeNoteId !== -1)
        {
            setContent(event.target.value);
            setSaveTick(currentTick + 1);
        }        
        else
        {
            alert("No note was selected!");
        }
    }
    
    function editTitle(event){
        if (activeNoteIdContext.activeNoteId !== -1)
        {
            setTitle(event.target.value);
            setSaveTick(currentTick + 1);
        }
        else
        {
            alert("No note was selected!");
        }
    }

    function saveNote(noteId){
        
        if (noteId === -1) return;
        controllerContext.controllerContext._noteController.getNoteById(noteId).then((noteToEdit) =>{
        if (noteToEdit.noteContent === content && noteToEdit.noteTitle === title)
        {
            return;
        }
        noteToEdit.noteContent = content;
        noteToEdit.noteTitle = title;
        controllerContext.controllerContext._noteController.saveNote(noteToEdit);
        props.useReload(!props.reload);
        });
    }


    function removeNote(event){
        if (activeNoteIdContext.activeNoteId === -1)
        {
            alert("No notes selected!");
            return;
        }
        controllerContext.controllerContext._noteController.getNoteById(activeNoteIdContext.activeNoteId).then((noteToDelete) =>{
            if (noteToDelete == null)
            {
                alert("Error: could not find note to delete!");
                return;
            }
            controllerContext.controllerContext._noteController.deleteNote(noteToDelete);
            activeNoteIdContext.setActiveNoteId(-1);
            props.useReload(!props.reload);
        });
    }

    useEffect(() =>{
        if (document.querySelector('.noteInput')!=null){
            if (activeNoteIdContext.activeNoteId !== -1)
            {
                if (previousActiveId.current !== -1)
                {
                    saveNote(previousActiveId.current)
                }
                previousActiveId.current = activeNoteIdContext.activeNoteId;
                controllerContext.controllerContext._noteController.getNoteById(activeNoteIdContext.activeNoteId).then((note) =>{
                    if (note === null)
                    {
                        setTitle("");
                        setContent("");
                        return;
                    }
                    setTitle(note.noteTitle);
                    setContent(note.noteContent);
                });
            }
            else
            {
                setTitle("");
                setContent("");
            }
        }  
        
    },[activeNoteIdContext.activeNoteId]);

    useInterval(() => {
        if (saveTick === currentTick && currentTick !== 0)
        {
            saveNote(activeNoteIdContext.activeNoteId);
        }
        setCurrentTick(currentTick + 1);
    },1000);    
    
    return (
        <div className = 'notesContent'>
            <input onChange={editTitle} type="text" value={title}></input>
            <button className="deleteButton" onClick={removeNote} >X</button>
            {(activeNoteIdContext.activeNoteId !== -1)&&<textarea className='noteInput' onChange={editNoteContents} value={content}></textarea>}
        </div>
    )
}

export default NotesContent;
