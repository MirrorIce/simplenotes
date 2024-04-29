import {createContext, useContext, useState} from 'react';
import './style/App.css';
import NotesList from './components/NotesList.tsx';
import NotesContent from './components/NotesContent.tsx'


function App() {
  const [activeNote,setActiveNote] = useState('');
  const [reload,useReload] = useState(false);
  return (
    <div className="App">
      <NotesList useReload = {useReload} reload={reload} className = "notesList" setActiveNote={setActiveNote} />
      <NotesContent useReload = {useReload} reload={reload} className = "notesContent" activeNote={activeNote} setActiveNote={setActiveNote} />
    </div>
  );
}

export default App;
