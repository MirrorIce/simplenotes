import React, { Component } from 'react'

export class AddNote extends Component {
    constructor(props){
        super(props);
        this.state = {
            newNoteTitle:''
        };

        this.handleInput = this.handleInput.bind(this);
        this.addNewNote = this.addNewNote.bind(this);
        this.useReload =  this.props.callback.bind(this);

    }

    handleInput(event){
        this.setState({newNoteTitle : event.target.value})
    }

    addNewNote(event){
        let simpleNotes = localStorage.getItem('simplenotes');
        let newNoteTitle = this.state.newNoteTitle;
        if ( simpleNotes === null )
        {
            localStorage.setItem('simplenotes',JSON.stringify([{noteTitle:newNoteTitle,noteValue:''}]));
        }
        else
        {
            let isFound = 0;
            simpleNotes = JSON.parse(simpleNotes);
            console.log(simpleNotes);
            for (let i = 0; i < simpleNotes.length; i++)
            {
                
                if (newNoteTitle === simpleNotes[i].noteTitle)
                {
                    isFound = 1;
                }
            }
            if (!isFound)
            {
                if (this.state.newNoteTitle !=='')
                {
                    simpleNotes.push({noteTitle:newNoteTitle,noteValue:''});
                    localStorage.setItem('simplenotes',JSON.stringify(simpleNotes));
                    this.useReload(!this.props.value);
                }
                else
                {
                    alert("Cannot add an empty note name!")
                }
            }
            else
            {
                alert("Note "+this.state.newNoteTitle+" duplicate found!");
            }
        }
    }
    
    render() {
        return (
            <div className = "addButton">
                <input type = 'text' placeholder = "New note title" onChange = {this.handleInput} />
                <button  onClick = {this.addNewNote}>+</button>
            </div>
        )
    }
}

export default AddNote;
