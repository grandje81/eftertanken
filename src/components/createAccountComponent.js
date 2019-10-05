import React, { Component } from 'react';
import axios from 'axios';

export default class createAccount extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: []
        }
    }


    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    onChangeEmailAddress(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onChangeConfirmPassword(e) {
        this.setState({
            password2: e.target.value
        })
    }
    
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        axios.post('http://localhost:4000/admin/create', obj)
        .then(res => {
            this.setState ({
                name: '',
                email: '',
                password: '',
                password2: ''
            })
            this.props.history.push('/logins');
        })
        .catch(err => {

            console.log('Error in creating account');
        })
    }

    render() {
        return (
            <div style={{marginTop: 25}}>
                <h3>Create Account </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control" value={this.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Email address: </label>
                        <input type="text" className="form-control" value={this.email} onChange={this.onChangeEmailAddress} />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" className="form-control" value={this.password} onChange={this.onChangePassword} />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" className="form-control" value={this.password2} onChange={this.onChangeConfirmPassword } /> 
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}