import React, { Component } from 'react';
import axios from 'axios'; 
import TableRow from './TableRow';


export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {station: []};
      }
    componentDidMount(){
        axios.get('http://localhost:4000/station')
          .then(response => {
            this.setState({ station: response.data });
            })
            .catch(function (error) {
            console.log(error);
        })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/station')
        .then(response => {
        this.setState({ station: response.data });
            })
            .catch(function (error) {
            console.log(error);
        })
    }

      tabRow(){
        return this.state.station.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
      }
  
      render() {
        return (
          <div>
            <h3 align="center">Station List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Station name</th>
                  <th>Station City</th>
                  <th>Station Fueltypes</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                { this.tabRow() }
              </tbody>
            </table>
          </div>
        );
      }
}