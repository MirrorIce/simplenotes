import {useState,useEffect} from 'react';
import '../style/NotesList.css';
import AddNote from './AddNote';

import NotesSelector from './NotesSelector';

function NotesList(props) {
 
  let [noteItems,setNoteItems] = useState([]);
  function toggleActiveNote(event){
      if (document.querySelector('.active') != null)
        document.querySelector('.active').setAttribute('class','');
        event.target.setAttribute('class','active')
        props.setActiveNote(event.target.textContent);
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
  },[props.reload]);
  return (
    <ul className="notesList">
        <AddNote callback={props.useReload} value = {props.reload} key = {lastIndex} />
        {noteItems.map((value,index) =>{console.log("AAA "+value.noteTitle);
            lastIndex = index;
            return (
            <li className="noteSelector" key = {index}>
              <NotesSelector key = {index} toggleActiveNote={toggleActiveNote} title={value.noteTitle}  />
              </li>
            )
        })}
    </ul>
  );
}

export default NotesList;