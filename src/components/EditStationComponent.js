// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeStationName = this.onChangeStationName.bind(this);
    this.onChangeStationCity = this.onChangeStationCity.bind(this);
    this.onChangeStationFueltypes = this.onChangeStationFueltypes.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      station_name: '',
      station_city: '',
      station_fueltypes:''
    }
  }

    componentDidMount() {
      axios.get('http://localhost:4000/station/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                station_name: response.data.station_name, 
                station_city: response.data.station_city,
                station_fueltypes: response.data.station_fueltypes });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/station/index')
        .then(response => {
        this.setState({ business: response.data });
            })
            .catch(function (error) {
            console.log(error);
        })
    }
  onChangeStationName(e) {
    this.setState({
      station_name: e.target.value
    });
  }
  onChangeStationCity(e) {
    this.setState({
      station_city: e.target.value
    })  
  }
  onChangeStationFueltypes(e) {
    this.setState({
      station_fueltypes: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      station_name: this.state.station_name,
      station_city: this.state.station_city,
      station_fueltypes: this.state.station_fueltypes
    };
    axios.post('http://localhost:4000/station/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Station</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Station Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.station_name}
                      onChange={this.onChangeStationName}
                      />
                </div>
                <div className="form-group">
                    <label>Station City: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.station_city}
                      onChange={this.onChangeStationCity}
                      />
                </div>
                <div className="form-group">
                    <label>Station Fueltypes: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.station_fueltypes}
                      onChange={this.onChangeStationFueltypes}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Business" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}