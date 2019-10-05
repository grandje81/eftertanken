import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
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
    
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            email: this.state.email,
            password: this.state.password,
        };
        axios.post('http://localhost:4000/user/login', obj)
        .then(res => {  
            this.setState ({
                email: '',
                password: '',
            })
            this.props.history.push('../logins');
        })
        .catch(err => {
            console.log('Error in login request');
        })
    }

    render() {
        return (
            <div style={{marginTop: 25}}>
                <h3>Enter Login Information</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email address: </label>
                        <input type="text" className="form-control" value={this.email} onChange={this.onChangeEmailAddress} />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" className="form-control" value={this.password} onChange={this.onChangePassword} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}