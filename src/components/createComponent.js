import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
        this.onChangeGSTNumber = this.onChangeGSTNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            person_name: '',
            business_name: '',
            business_gst_number: ''
        }
    }

    onChangePersonName(e) {
        this.setState({
            person_name: e.target.value
        })
    }
    onChangeBusinessName(e) {
        this.setState({
            business_name: e.target.value
        })
    }
    onChangeGSTNumber(e) {
        this.setState({
            business_gst_number: e.target.value
        })
    }
    
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            person_name: this.state.person_name,
            business_name: this.state.business_name,
            business_gst_number: this.state.business_gst_number
        };
        axios.post('http://localhost:4000/business/add', obj)
        .then(res => {
            this.setState ({
                person_name: '',
                business_name: '',
                business_gst_number: ''
            })
            this.props.history.push('/create');
        })
        .catch(err => {
            console.log('Error in creating business');
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Business</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Person Name: </label>
                        <input type="text" className="form-control" value={this.person_name} onChange={this.onChangePersonName} />
                    </div>
                    <div className="form-group">
                        <label>Add Business Name: </label>
                        <input type="text" className="form-control" value={this.business_name} onChange={this.onChangeBusinessName} />
                    </div>
                    <div className="form-group">
                        <label>Add GST Number: </label>
                        <input type="text" className="form-control" value={this.business_gst_number} onChange={this.onChangeGSTNumber} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register Business" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}