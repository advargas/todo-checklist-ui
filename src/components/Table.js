// Table.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Table extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    axios.delete('http://localhost/api/todo/' + this.props.obj.code)
      .then(response => {
        this.props.handlerUpdate();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.code}
        </td>
        <td>
          {this.props.obj.text}
        </td>
        <td>
          {this.props.obj.priority}
        </td>
        <td>
          {(new Date(this.props.obj.createdAt)).toLocaleString()}
        </td>
        <td>
          {(new Date(this.props.obj.updatedAt)).toLocaleString()}
        </td>
        <td>
          <Link to={"/edit/" + this.props.obj.code} className="btn btn-primary">Edit</Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  }
}

export default Table;