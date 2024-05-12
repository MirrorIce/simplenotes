import { useState, useContext } from 'react'
import { ControllersContext } from '../App';
import ContextModel from '../models/ContextModel';

function AddNote(props) {
    let [newNoteTitle, setNewNoteTitle] = useState<string>('');
    let controllerContext = useContext(ControllersContext);

    function handleInput(event) {
        setNewNoteTitle(event.target.value);
    }

    function addNewNote(event) {
        let result = controllerContext.controllerContext._noteController.addNote(newNoteTitle);
        if (result === 0) {
            props.callback(!props.value);
        }
    }

    return (
        <div className="addButton">
            <input type='text' placeholder="Add a new note" onChange={handleInput} />
            <button onClick={addNewNote}>+</button>
        </div>
    )
}
export default AddNote;
