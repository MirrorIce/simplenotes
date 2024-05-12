import { createContext, useContext, useState } from 'react';
import './style/App.css';
import NotesList from './components/NotesList.tsx';
import NotesContent from './components/NotesContent.tsx'
import ContextModel from './models/ContextModel.ts';
import LocalStorageNoteController from './controllers/LocalStorageNoteController.ts';
import Login from './components/Login.tsx';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.tsx';
import AppSettingsModel from './models/AppSettingsModel.ts';

export const ControllersContext = createContext(null);
export const ActiveNoteContext = createContext(null);
export const AppSettingsContext = createContext(new AppSettingsModel(false, null, false, null, false, null));

function App() {
  const [activeNote, setActiveNote] = useState<string>('');
  const [activeNoteId, setActiveNoteId] = useState<number>(-1);
  const [reload, useReload] = useState(false);
  const [isLocalStorage, setIsLocalStorage] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);


  const [controllerContext, setControllerContext] = useState(new ContextModel(new LocalStorageNoteController()));
  return (
    <div className="App">
      <AppSettingsContext.Provider value={new AppSettingsModel(isLocalStorage, setIsLocalStorage, isUserLoggedIn, setIsUserLoggedIn, isDarkMode, setIsDarkMode)}>
        <ControllersContext.Provider value={{ controllerContext, setControllerContext }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/"
              element={
                <PrivateRoute>
                  <ActiveNoteContext.Provider value={{ activeNoteId, setActiveNoteId }}>
                    <NotesList useReload={useReload} reload={reload} className="notesList" setActiveNote={setActiveNote} />
                    <NotesContent useReload={useReload} reload={reload} className="notesContent" activeNote={activeNote} setActiveNote={setActiveNote} />
                  </ActiveNoteContext.Provider>
                </PrivateRoute>
              }
            />
          </Routes>
        </ControllersContext.Provider>
      </AppSettingsContext.Provider>

    </div>
  );
}

export default App;
