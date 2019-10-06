// TableRow.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:4000/station/delete/'+this.props.obj._id)
            .then(res => {
              console.log('Deleted');
              this.props.delete(this.props.indice);
            })
            .catch(err => console.log(err))
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.station_name}
          </td>
          <td>
            {this.props.obj.station_city}
          </td>
          <td>
            {this.props.obj.station_fueltypes}
          </td>
          <td>
          <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}
export default TableRow;