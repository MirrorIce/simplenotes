import React,{ useState} from 'react';
import './style/NotesList.css';
import AddNote from './AddNote';

import { NotesSelector } from './NotesSelector';

function NotesList(props) {
 
 let i = 0;
 let items = [];
 for (i ;i<localStorage.length;i++){
    items.push(localStorage.key(i));
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
            return <li className="noteSelector"><NotesSelector toggleActiveNote={toggleActiveNote} title={value} key = {index} /></li>
        })}
        <AddNote callback={props.useReload} value = {props.reload} key = {lastIndex} />
    </ul>
  );
}

export default NotesList;