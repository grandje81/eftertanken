import React, { Component } from 'react';
import axios from 'axios';

export default class CreateStation extends Component {
    constructor(props) {
        super(props);
        this.onChangeStation_Name = this.onChangeStation_Name.bind(this);
        this.onChangeStation_City = this.onChangeStation_City.bind(this);
        this.onChangeStation_Fueltypes = this.onChangeStation_Fueltypes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            station_name: '',
            station_city: '',
            station_fueltypes: ''
        }
    }

    onChangeStation_Name(e) {
        this.setState({
            station_name: e.target.value
        })
    }
    onChangeStation_City(e) {
        this.setState({
            station_city: e.target.value
        })
    }
    onChangeStation_Fueltypes(e) {
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
        axios.post('http://localhost:4000/station/add', obj)
        .then(res => {
            this.setState ({
                station_name: '',
                station_city: '',
                station_fueltypes: ''
            })
            this.props.history.push('/create');
        })
        .catch(err => {
            console.log('Error in creating station');
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add Station Business</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Station Name: </label>
                        <input type="text" className="form-control" value={this.person_name} onChange={this.onChangePersonName} />
                    </div>
                    <div className="form-group">
                        <label>Add Station City: </label>
                        <input type="text" className="form-control" value={this.business_name} onChange={this.onChangeBusinessName} />
                    </div>
                    <div className="form-group">
                        <label>Add Station Fueltypes: </label>
                        <input type="text" className="form-control" value={this.business_gst_number} onChange={this.onChangeGSTNumber} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register Station" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}