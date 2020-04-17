// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeStationName = this.onChangeStationName.bind(this);
    this.onChangeStationCity = this.onChangeStationCity.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      station_name: '',
      station_city: '',
      station_fueltypes: [],
      options: [],
      diesel: false,
      e85: false,
      bio: false,
      b95: false,
      b98: false
    }
  }

    what(myReponse)
    {
      myReponse.forEach(element => {
        if(element === "Diesel"){
          this.setState({
            diesel: true
          });
        }
        if(element === "E85"){
          this.setState({
            e85: true
          });
        }
        if(element === "Biodiesel"){
          this.setState({
            bio: true
          });
        }
        if(element === "95"){
          this.setState({
            b95: true
          })
        }
        if(element === "98"){
          this.setState({
            b98: true
          })
        }

      });
    }

    componentDidMount() {
      axios.get('http://localhost:4000/station/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                station_name: response.data.station_name, 
                station_city: response.data.station_city,
                station_fueltypes: response.data.station_fueltypes 
              
              });
              this.what(response.data.station_fueltypes);
          })
          .catch(function (error) {
              console.log(error);
          })    
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/station/index')
        .then(response => {
        this.setState({ station: response.data });
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
  onChangeCheck(e) {
    if(e.target.value === "E85"){
      this.setState({
        e85: e.target.checked
      });
    };
    if(e.target.value === "95"){
      this.setState({
        b95: e.target.checked
      });
    };
    if(e.target.value === "98"){
      this.setState({
        b98: e.target.checked
      });
    };
    if(e.target.value === "Biodiesel"){
      this.setState({
        bio: e.target.checked
      });
    };
    if(e.target.value === "Diesel"){
      this.setState({
        diesel: e.target.checked
      });
    };
  }
  

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.fuelchecked)
    const obj = {
      station_name: this.state.station_name,
      station_city: this.state.station_city,
      station_fueltypes: this.state.fuelchecked
    };
    axios.post('http://localhost:4000/station/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/station/index');
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
               { // TODO: Fixa en mappning som itererar igenom response, och lägger kryss i rätt ruta.
               }
                <div className="form-group">
                <label> Station Fueltypes:<br />
                        <input type="checkbox" className="form-check-input" value="E85" checked={this.state.e85} onChange={this.onChangeCheck}/>
                        <span>E85</span>
                        <br />
                        <input type="checkbox" className="form-check-input" value="95" checked={this.state.b95} onChange={this.onChangeCheck}/>
                        <span>95</span>
                        <br />
                        <input type="checkbox" className="form-check-input" value="98" checked={this.state.b98} onChange={this.onChangeCheck}/>
                        <span>98</span>
                        <br />
                        <input type="checkbox" className="form-check-input" value="Biodiesel" checked={this.state.bio} onChange={this.onChangeCheck}/>
                        <span>Bio Diesel</span>
                        <br />
                        <input type="checkbox" className="form-check-input" value="Diesel" checked={this.state.diesel} onChange={this.onChangeCheck} />
                        <span>Diesel</span>
                    </label>
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