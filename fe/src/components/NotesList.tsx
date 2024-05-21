/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import AddNote from './AddNote';

import NotesSelector from './NotesSelector';
import { ControllersContext } from '../App';
import NoteModel from '../models/NoteModel';
import SearchBar from './SearchBar';

function NotesList(props) {

  let [noteItems, setNoteItems] = useState([]);
  let [showAllNotes, setShowAllNotes] = useState(true);
  let controllerContext = useContext(ControllersContext);
  let lastIndex = 0;
  useEffect(() => {

    controllerContext.controllerContext._noteController.getAllNotes().then((items) => {
      if (items !== null) {
        setNoteItems(items);
      }
    });
  }, [props.reload]);

  return (
    <ul className={props.className}>
      <AddNote key={lastIndex} useReload = {props.useReload} reload = {props.reload} />
      <SearchBar setShowAllNotes={setShowAllNotes} handleMenu={props.handleMenu} />
      {
        showAllNotes === true ? noteItems.map((value: NoteModel, index) => {
          lastIndex = index;
          return (
            <li className="noteSelector" key={index}>
              <NotesSelector key={value.noteId} noteId={value.noteId} title={value.noteTitle} handleMenu={props.handleMenu} />
            </li>
          )
        })
          :
          ""
      }
    </ul>
  );
}

export default NotesList;