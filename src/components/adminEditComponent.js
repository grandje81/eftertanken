// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';

export default class editAccount extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    //this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: '',
      email: '',
      reportStartDate: '',
    }
  }

    componentDidMount() {
      
    let tempDate = new Date();
    let curdate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(); 
      axios.get('http://localhost:4000/admin/editAccount/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                name: response.data.name, 
                email: response.data.email,
                date: response.data.date,
                reportStartDate: curdate,
              });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/admin/')
        .then(response => {
        this.setState({ accounts: response.data });
            })
            .catch(function (error) {
            console.log(error);
        })
    }
  onChangeName(e) {
    this.setState({
       name: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })  
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      email: this.state.email,
      date: this.state.reportStartDate,
    };
    axios.post('http://localhost:4000/admin/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/admin/logins');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update User Account</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.name}
                      onChange={this.onChangeName}
                      />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      />
                </div>
                <div className="form-group">
                    <label>Creation Date: </label>
                    {/*<input type=""
                      enabled="false" 
                      className="form-control"
                      value={this.state.date}
                      /> */}
                      &nbsp;
                      <label>{this.state.date}</label> 
                </div>
                <div className="form-group">
                      <label>Current date: </label>
                      &nbsp;
                       <label> { this.state.reportStartDate }  </label> 
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update User Account" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}