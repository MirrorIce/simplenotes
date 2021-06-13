import React, { Component } from 'react'

export class NotesSelector extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.title !== this.props.title)
        {
            this.setState({title:this.props.title});
        }
    }

    render() {
        return (
            <div className = "noteName" onClick = {this.props.toggleActiveNote} value = {this.state.title}>
                {this.state.title}
            </div>
        )
    }
}

export default NotesSelector
