import { useContext } from 'react'
import { ActiveNoteContext } from '../App';


function NotesSelector(props){
    let activeNoteContext = useContext(ActiveNoteContext);   

    function toggleActiveNote(event)
    {
        activeNoteContext.setActiveNoteId(props.noteId);
        let removeActive = document.querySelector('.active');
        if (removeActive !== null)
        {
            removeActive.setAttribute('class','');
        }
        event.target.setAttribute('class','active');
    }

    return (
     <div className = "noteName" onClick = {toggleActiveNote} key = {props.title}>
       {props.title}
     </div>
    )
}

export default NotesSelector;
