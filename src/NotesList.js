import React,{ useState} from 'react';
import './style/NotesList.css';
import AddNote from './AddNote';

import { NotesSelector } from './NotesSelector';

function NotesList(props) {
 
 let i = 0;
 let items = [];
//  localStorage.clear();
 for (i ;i<localStorage.length;i++){
    items.push(localStorage.key(i));
}
  function toggleActiveNote(event){
      if (document.querySelector('.active') != null)
        document.querySelector('.active').setAttribute('class','');
      event.target.setAttribute('class','active')
      props.setActiveNote(event.target.getAttribute('value'));
  }
  return (
    <ul className="notesList">
        {items.map((value,index) =>{
            return <li onClick={toggleActiveNote} className="noteSelector"><NotesSelector title={value} key = {index} /></li>
        })}
        <AddNote callback={props.useReload} value = {props.reload} />
    </ul>
  );
}

export default NotesList;