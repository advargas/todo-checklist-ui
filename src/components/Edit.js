// Edit.js

import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      text: '',
      priority: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/todo/api/todo/' + this.props.match.params.code)
      .then(response => {
        this.setState({
          text: response.data.response.text,
          priority: response.data.response.priority
        });
      })
      .catch(function (error) {
        console.log(error);
      })
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
    const obj = {
      text: this.state.text,
      priority: this.state.priority
    };
    axios.put('http://localhost:8080/todo/api/todo/' + this.props.match.params.code, obj)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/index');
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Update TODO Entry</h3>
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
            <input type="submit"
              value="Update TODO"
              className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}