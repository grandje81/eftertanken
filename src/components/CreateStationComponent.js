import React, { Component } from 'react';
import axios from 'axios';

export default class CreateStation extends Component {
    constructor(props) {
        super(props);
        this.onChangeStation_Name = this.onChangeStation_Name.bind(this);
        this.onChangeStation_City = this.onChangeStation_City.bind(this);

        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            station_name: '',
            station_city: '',
            station_fueltypes: [],
            options: []
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
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

    onChangeCheck(e) {
        const options = this.state.options
        let index
        if (e.target.checked) {
            options.push(e.target.value);
        } else {
            index = options.indexOf(e.target.value);
            options.splice(index, 1);
        }
        this.setState({
            station_fueltypes: options
        });
        console.log(e.target.value)
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            station_name: this.state.station_name,
            station_city: this.state.station_city,
            station_fueltypes: this.state.options
        };
        axios.post('http://localhost:4000/station/add', obj)
            .then(res => {
                this.setState({
                    station_name: '',
                    station_city: '',
                    station_fueltypes: ''
                })
                this.props.history.push('/station/index');
            })
            .catch(err => {
                console.log('Error in creating station');
            })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Add Station Business</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Station Name: </label>
                        <input type="text" className="form-control" value={this.station_name} onChange={this.onChangeStation_Name} />
                    </div>
                    <div className="form-group">
                        <label>Station City: </label>
                        <input type="text" className="form-control" value={this.station_city} onChange={this.onChangeStation_City} />
                    </div>
                    <div className="form-group">
                        <label> Station Fueltypes:<br />
                            <input type="checkbox" className="form-check-input" value="E85" checked={false} onChange={this.onChangeCheck} />
                            <span>E85</span>
                            <br />
                            <input type="checkbox" className="form-check-input" value="95" checked={false} onChange={this.onChangeCheck} />
                            <span>95</span>
                            <br />
                            <input type="checkbox" className="form-check-input" value="98" checked={false} onChange={this.onChangeCheck} />
                            <span>98</span>
                            <br />
                            <input type="checkbox" className="form-check-input" value="Biodiesel" checked={false} onChange={this.onChangeCheck} />
                            <span>Bio Diesel</span>
                            <br />
                            <input type="checkbox" className="form-check-input" value="Diesel" checked={false} onChange={this.onChangeCheck} />
                            <span>Diesel</span>
                        </label>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Register Station" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}