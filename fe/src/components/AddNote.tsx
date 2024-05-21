import { useState, useContext } from 'react'
import { ControllersContext } from '../App';
import ContextModel from '../models/ContextModel';

function AddNote(props) {
    let [newNoteTitle, setNewNoteTitle] = useState<string>('');
    let controllerContext = useContext(ControllersContext);

    function handleInput(event) {
        setNewNoteTitle(event.target.value);
    }

    async function addNewNote(event) {
        let result = await controllerContext.controllerContext._noteController.addNote(newNoteTitle);
        if (result === 0) {
            props.useReload(!props.reload);
            alert("Note added!");
        }
    }

    return (
        <div className="addButton">
            <input type='text' placeholder="Add a new note" onChange={handleInput} />
            <i onClick={addNewNote} />
        </div>
    )
}
export default AddNote;
