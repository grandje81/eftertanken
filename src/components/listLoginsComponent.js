import React, { Component } from 'react';
import axios from 'axios'; 
import TableRow from './accountsTableRow';


export default class listLogins extends Component {
    constructor(props) {
        super(props);
        this.state = {accounts: []};
      }

CancelToken = axios.CancelToken;
source = this.CancelToken.source();

abortController = new AbortController();

fetchAccounts = async () =>  {
    try {
      let result =  await axios.get('http://localhost:4000/admin/',  { cancelToken: this.source.token
    });
    return result.data;
  }   catch (error) {
    if(axios.isCancel(error)) {
      console.log("Request got cancelled", error.message);
      throw new Error("Cancelled");
    }
  }
};

componentDidMount(){
  this.fetchAccounts()
  .then(data => {
    this.setState({ accounts: data });
  })
  .catch(err => {
    console.log("Cancelled");
  })
      
      /*
      fetch(axios.get('http://localhost:4000/admin/'), { signal: this.abortController.signal})
          .then(response => {
            this.setState({ accounts: response.data });
            })
            .catch(function (error) {
              if(error.name === 'AbortError') return
              throw error
            //console.log(error);
        }) */
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/admin')
        .then(response => {
        this.setState({ accounts: response.data });
            })
            .catch(function (error) {
            console.log(error);
        })
    }
    
    tabRow(){
      return this.state.accounts.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    componentWillUnmount() {
      this.source.cancel("Operation cancelled by user");
    }
  
      render() {
        return (
          <div>
            <h3 align="center">List of Accounts</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Id:</th>
                  <th>Name:</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Date created</th>
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