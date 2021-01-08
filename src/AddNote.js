import React, { Component } from 'react'

export class AddNote extends Component {
    constructor(props){
        super(props);
        this.state = {
            newNoteTitle:''
        };

        this.handleInput = this.handleInput.bind(this);
        this.addNewNote = this.addNewNote.bind(this);
        this.useReload = this.props.callback(this);
    }

    handleInput(event){
        this.setState({newNoteTitle : event.target.value})
    }

    addNewNote(event){
        if (localStorage.getItem(this.state.newNoteTitle) === null){
            if (this.state.newNoteTitle != ''){
                localStorage.setItem(this.state.newNoteTitle,'');
                this.props.callback(!this.props.value);
            }
            
        } 
        else{
            console.log(this.state.newNoteTitle);
            alert('Note found! '+ this.state.newNoteTitle);
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
