import React,{useState,useEffect} from 'react';
import './style/NotesList.css';
import AddNote from './AddNote';

import { NotesSelector } from './NotesSelector';

function NotesList(props) {
 
  let [noteItems,setNoteItems] = useState([]);
  function toggleActiveNote(event){
      if (document.querySelector('.active') != null)
        document.querySelector('.active').setAttribute('class','');
        event.target.setAttribute('class','active')
        props.setActiveNote(event.target.getAttribute('value'));
  }
  let lastIndex = 0;
  useEffect(() =>{
    let items = [];
    let simpleNotes = localStorage.getItem('simplenotes');
    if (simpleNotes !== null)
    {
      items = JSON.parse(simpleNotes);
      setNoteItems(items);
    }
  });
  return (
    <ul className="notesList">
        {noteItems.map((value,index) =>{
            lastIndex = index;
            return <li className="noteSelector" key = {index}><NotesSelector toggleActiveNote={toggleActiveNote} title={value.noteTitle}  /></li>
        })}
        <AddNote callback={props.useReload} value = {props.reload} key = {lastIndex} />
    </ul>
  );
}

export default NotesList;