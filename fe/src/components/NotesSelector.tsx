import { useContext } from 'react'
import { ActiveNoteContext } from '../App';


function NotesSelector(props) {
    let activeNoteContext = useContext(ActiveNoteContext);

    function toggleActiveNote(event) {
        activeNoteContext.setActiveNoteId(props.noteId);
        props.handleMenu();
    }

    return (
        <div className={
            `noteName ${activeNoteContext.activeNoteId === props.noteId ? "active" : ""}`
        }
            onClick={toggleActiveNote} key={props.title}>
            {props.title}
        </div>
    )
}

export default NotesSelector;
