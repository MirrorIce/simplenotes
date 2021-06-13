import React from 'react';
import './style/NotesList.css';
import AddNote from './AddNote';

import { NotesSelector } from './NotesSelector';

function NotesList(props) {
 
  let items = [];
  let simpleNotes = localStorage.getItem('simplenotes');
  if (simpleNotes !== null)
  {
    items = JSON.parse(simpleNotes);
  }

  function toggleActiveNote(event){
      if (document.querySelector('.active') != null)
        document.querySelector('.active').setAttribute('class','');
        event.target.setAttribute('class','active')
        props.setActiveNote(event.target.getAttribute('value'));
  }
  let lastIndex = 0;
  return (
    <ul className="notesList">
        {items.map((value,index) =>{
            lastIndex = index;
            return <li className="noteSelector" key = {index}><NotesSelector toggleActiveNote={toggleActiveNote} title={value.noteTitle}  /></li>
        })}
        <AddNote callback={props.useReload} value = {props.reload} key = {lastIndex} />
    </ul>
  );
}

export default NotesList;