import React, {useState,useEffect} from 'react';


function NotesContent(props) {
    const [content,setContent] = useState('');
    function saveNote(event){
        if (props.activeNote != '')
            {
                setContent(event.target.value);
                localStorage.setItem(props.activeNote,event.target.value);
            }        
        else
            {
                alert("No note was selected!");
            }
    }
    useEffect(() =>{
        if (document.querySelector('.noteInput')!=null){
            setContent(localStorage.getItem(props.activeNote));
        }
        else
        {
            setContent('');
        }
            
    })
    return (
        <div className = 'notesContent'>
            <h1>{props.activeNote}</h1>
            {(props.activeNote !='')&&<textarea className='noteInput' onChange={saveNote} value={content}></textarea>}
        </div>
    )
}

export default NotesContent;
