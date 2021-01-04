import React, { Component } from 'react'

export class NotesSelector extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title
        }
    }

    componentWillReceiveProps(nextProps){
        const { title } = nextProps;
        if(title !== this.state.title) {
            this.setState({title});
        }
    }

    render() {
        return (
            <div value = {this.state.title}>
                {this.state.title}
            </div>
        )
    }
}

export default NotesSelector
