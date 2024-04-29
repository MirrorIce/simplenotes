import {createContext, useContext, useState} from 'react';
import './style/App.css';
import NotesList from './components/NotesList.tsx';
import NotesContent from './components/NotesContent.tsx'
import ContextModel from './models/ContextModel.ts';
import LocalStorageNoteController from './controllers/LocalStorageNoteController.ts';

export const ControllersContext = createContext(null);
export const ActiveNoteContext = createContext(null);

function App() {
  const [activeNote,setActiveNote] = useState<string>('');
  const [activeNoteId, setActiveNoteId] = useState<number>(-1);
  const [reload,useReload] = useState(false);
  const controllerContext = new ContextModel(new LocalStorageNoteController());

  return (
    <div className="App">
      <ControllersContext.Provider value = {controllerContext}>
        <ActiveNoteContext.Provider value = {{activeNoteId, setActiveNoteId}}>
          <NotesList useReload = {useReload} reload={reload} className = "notesList" setActiveNote={setActiveNote} />
          <NotesContent useReload = {useReload} reload={reload} className = "notesContent" activeNote={activeNote} setActiveNote={setActiveNote} />  
        </ActiveNoteContext.Provider>
      </ControllersContext.Provider>
    </div>
  );
}

export default App;
