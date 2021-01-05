import React, {useState,useEffect} from 'react';


function NotesContent(props) {
    let [title,setTitle] = useState('');
    let [content,setContent] = useState('');
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
    function editTitle(event){
        setTitle(event.target.value);
        localStorage.setItem(event.target.value,localStorage.getItem(props.activeNote));
        props.setActiveNote(event.target.value);
        localStorage.removeItem(props.activeNote);

    }
    useEffect(() =>{
        if (document.querySelector('.noteInput')!=null){
            setContent(localStorage.getItem(props.activeNote));
            setTitle(props.activeNote);
        }
        else
        {
            setContent('');
        }
            
    },[props.activeNote]);
    return (
        <div className = 'notesContent'>
            <input onChange={editTitle} type="text" value={title}></input>
            {(props.activeNote !='')&&<textarea className='noteInput' onChange={saveNote} value={content}></textarea>}
        </div>
    )
}

export default NotesContent;
