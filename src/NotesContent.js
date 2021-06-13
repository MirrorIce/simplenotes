import React, {useState,useEffect} from 'react';


function NotesContent(props) {
    let [title,setTitle] = useState('');
    let [content,setContent] = useState('');
    function saveNote(event){
        if (props.activeNote !== '')
        {
        setContent(event.target.value);
        let simpleNotes = JSON.parse(localStorage.getItem('simplenotes'));
        for (let i = 0; i < simpleNotes.length; i++)
        {
            if (simpleNotes[i].noteTitle === props.activeNote)
            {
                simpleNotes[i].noteValue = event.target.value;
            }
        }
        localStorage.setItem('simplenotes', JSON.stringify(simpleNotes));
        }        
        else
        {
            alert("No note was selected!");
        }
    }
    function editTitle(event){
        setTitle(event.target.value);
        let simpleNotes = JSON.parse(localStorage.getItem('simplenotes'));
        for (let i = 0; i < simpleNotes.length; i++)
        {
            if (simpleNotes[i].noteTitle === props.activeNote)
            {
                simpleNotes[i].noteTitle = event.target.value;
            }
        }
        localStorage.setItem('simplenotes', JSON.stringify(simpleNotes))
        props.setActiveNote(event.target.value);
        // localStorage.removeItem(props.activeNote);

    }
    function removeNote(event){
        let simpleNotes = JSON.parse(localStorage.getItem('simplenotes'));
        if (simpleNotes != null && props.activeNote !== '')
        {
            
            for (let i = 0; i < simpleNotes.length; i++)
            {
                if (simpleNotes[i].noteTitle === props.activeNote)
                {
                    simpleNotes.splice(i,1);
                    console.log(simpleNotes);
                    localStorage.setItem('simplenotes',JSON.stringify(simpleNotes));
                    
                    if (0 === simpleNotes.length)
                    {
                        props.setActiveNote('');
                    }
                    else
                    {
                        props.setActiveNote(JSON.parse(localStorage.getItem('simplenotes'))[0].noteTitle);
                    }
                }
            }    
        }
        else
        {
            alert("Invalid deletion!");
        }

    }
    useEffect(() =>{
        if (document.querySelector('.noteInput')!=null){
            let simpleNotes = JSON.parse(localStorage.getItem('simplenotes'));
            if (simpleNotes != null && props.activeNote !== '')
            {
                for (let i = 0; i < simpleNotes.length; i++)
                {
                    if (simpleNotes[i].noteTitle === props.activeNote)
                    {
                        setContent(simpleNotes[i].noteValue);
                    }
                }
                setTitle(props.activeNote);
            }
            else
            {
                setContent('');
            }
        }   
    },[props.activeNote]);
    return (
        <div className = 'notesContent'>
            <input onChange={editTitle} type="text" value={title}></input>
            <button className="deleteButton" onClick={removeNote} >X</button>
            {(props.activeNote !== '')&&<textarea className='noteInput' onChange={saveNote} value={content}></textarea>}
        </div>
    )
}

export default NotesContent;
