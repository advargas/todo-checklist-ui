// Create.js

import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            text: '',
            priority: 'High'
        }
    }
    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }
    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(`The values are ${this.state.text}, and ${this.state.priority}`)
        const obj = {
            text: this.state.text,
            priority: this.state.priority
        };
        axios.post('http://localhost:8080/todo/api/todo', obj)
            .then(res => console.log(res.data));

        this.setState({
            text: '',
            priority: ''
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Add New TODO</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Text:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.text}
                            onChange={this.onChangeText}
                        />
                    </div>
                    <div className="form-group">
                        <label>Priority: </label>
                        <select
                            className="form-control"
                            value={this.state.priority}
                            onChange={this.onChangePriority}>
                            <option value="High" className="form-control">High</option>
                            <option value="Medium" className="form-control">Medium</option>
                            <option value="Low" className="form-control">Low</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register TODO" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}