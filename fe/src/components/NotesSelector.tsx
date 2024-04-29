import { useState, useEffect } from 'react'


function NotesSelector(props){
    let [title, setTitle] = useState<string>('');

    useEffect(() => {
        if (title !== props.title)
        {
            setTitle(props.title);
        }
    }, [title, props.title])

    return (
     <div className = "noteName" onClick = {props.toggleActiveNote} key = {title}>
       {title}
     </div>
    )
}

export default NotesSelector;
