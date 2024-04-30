/* eslint-disable react-hooks/exhaustive-deps */
import {useState,useEffect, useContext} from 'react';
import '../style/NotesList.css';
import AddNote from './AddNote';

import NotesSelector from './NotesSelector';
import { ControllersContext } from '../App';
import NoteModel from '../models/NoteModel';

function NotesList(props) {
 
  let [noteItems,setNoteItems] = useState([]);
  let controllerContext = useContext(ControllersContext);
  let lastIndex = 0;
  useEffect(() =>{
    let items : NoteModel[] = controllerContext.controllerContext._noteController.getAllNotes();
    if (items !== null)
    {
      setNoteItems(items);
    }
  },[props.reload]);
  
  return (
    <ul className="notesList">
        <AddNote key = {lastIndex} />
        {noteItems.map((value : NoteModel,index) =>{
            lastIndex = index;
            return (
            <li className="noteSelector" key = {index}>
              <NotesSelector key = {value.noteId} noteId = {value.noteId} title={value.noteTitle}  />
            </li>
            )
        })}
    </ul>
  );
}

export default NotesList;