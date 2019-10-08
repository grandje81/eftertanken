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
      options: []
    }
  }

    componentWillMount(){
      let me = this,
      ftypes = this.props.state.fueltypes,
      setupCheckBoxes = (() => {
        return ftypes.map((type) =>{
          return {
            fuelTypeName: type,
            isChecked: false
          }
        });
      })();
      this.setState({
        allTypesCbData: setupCheckBoxes
      })
    }

    componentDidMount() {
      axios.get('http://localhost:4000/station/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                station_name: response.data.station_name, 
                station_city: response.data.station_city,
                station_fueltypes: response.data.station_fueltypes
                });
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
    const options = this.state.options
    let index
    let id = e.target.id
    if(e.target.checked) {
      options.push(e.target.value);
    } else {
      index = options.indexOf(e.target.value);
      options.splice(index, 1);
    }
    this.setState({
      station_fueltypes: options
    })
  }

  onSubmit(e) {
    //e.preventDefault();
    const obj = {
      station_name: this.state.station_name,
      station_city: this.state.station_city,
      station_fueltypes: this.state.options
    };
    axios.post('http://localhost:4000/station/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/station/index');
  }
 
  render() {
    let ftypeCbData = this.state.allTypesCbData,
    me = this;
    
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
               { // TODO: Fixa en mappning som irreterar igenom response, och lägger kryss i rätt ruta.
               }
                <div className="form-group">
                 
                <label> Station Fueltypes:
                  <br />
                        {ftypeCbData.map((el, index) => {
                          return (
                            <div key={el.fuelTypeName}>
                              <input type="checkbox" name={el.teamName} checked={el.isChecked} onChange={
                                function () {
                                  let curData = me.state.allTypesCbData,
                                  id = curData.findIndex(function(elem) { return elem.fuelTypeName == el.fuelTypeName});
                                  curData[id].isChecked = ! curData[id].isChecked;
                                  me.setState({allTypesCbData:curData})
                                }
                              } />
                              <label >{el.fuelTypeName}</label>
                            </div>
                          );
                        })} 
                              
                        <input type="checkbox" className="form-check-input" id="1" value="E85" checked={this.state.checked} onChange={this.onChangeCheck}/>
                        <span>E85</span>
                        <br />
                        <input type="checkbox" className="form-check-input" id="2" value="95" checked={this.state.checked} onChange={this.onChangeCheck}/>
                        <span>95</span>
                        <br />
                        <input type="checkbox" className="form-check-input" id="3" value="98" checked={this.state.checked} onChange={this.onChangeCheck}/>
                        <span>98</span>
                        <br />
                        <input type="checkbox" className="form-check-input" id="4" value="Biodiesel" checked={this.state.checked} onChange={this.onChangeCheck}/>
                        <span>Bio Diesel</span>
                        <br />
                        <input type="checkbox" className="form-check-input" id="5" value="Diesel" checked={this.state.checked} onChange={this.onChangeCheck} />
                        <span>Diesel</span>
                        <br />
                        <input type="checkbox" className="form-check-input" id="6" value="HVO100" checked={this.state.checked} onChange={this.onChangeCheck} />
                        <span>HVO100</span>
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