// index.component.js

import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.handlerUpdate = this.handlerUpdate.bind(this);
    this.state = { todos: [] };
  }

  componentDidMount() {
    this.getTodoList();
  }

  getTodoList() {
    axios.get('http://localhost:8080/todo/api/todo')
    .then(response => {
      console.log(response.data);
      this.setState({ todos: response.data.response });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handlerUpdate() {
    console.log('En handlerUpdate');
    this.getTodoList();
  }

  renderTable() {
    return this.state.todos.map(function (object, i) {
      return <Table obj={object} key={i} handlerUpdate={this.handlerUpdate} />;
    }, this);
  }

  render() {
    return (
      <div>
        <h3 align="center">TODO Check List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Text</th>
              <th>Priority</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTable()}
          </tbody>
        </table>
      </div>
    );
  }
}