import{ useState } from 'react'


function AddNote(props)
{
    let [newNoteTitle, setNewNoteTitle] = useState<string>('');

    function handleInput(event)
    {
        setNewNoteTitle(event.target.value);
    }

    function addNewNote(event)
    {
        let simpleNotes : any = localStorage.getItem('simpleNotes');
        setNewNoteTitle(event.target.value);
        if (simpleNotes == null)
        {
            localStorage.setItem('simplenotes', JSON.stringify([{noteTitle: newNoteTitle, noteValue:""}]));
        }
        else
        {
            let isFound : boolean = false;
            let parsedSimpleNotes : any = JSON.parse(simpleNotes);
            for (let element  in parsedSimpleNotes)
            {
                if (newNoteTitle === element["noteTitle"])
                {
                    isFound = true;
                    break;
                }    
            }
            if (!isFound)
            {
                if (newNoteTitle != "")
                {
                    parsedSimpleNotes.push({noteTitle: newNoteTitle, noteValue: ""});
                    localStorage.setItem('simplenotes', JSON.stringify(parsedSimpleNotes));
                    props.useReload(!this.props.value);
                }
                else
                {
                    alert("Cannot add an emty note!");
                }
            }
            else
            {
                alert("Note "+this.state.newNoteTitle+" duplicate found!");
            }
        }
    }

    return(
            <div className = "addButton">
                <input type = 'text' placeholder = "New note title" onChange = {handleInput} />
                <button  onClick = {addNewNote}>+</button>
            </div>
    )
}
export default AddNote;
