import React, {Component} from 'react';
//import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
//import './index.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

// Old Business stuff

//import Create from './components/createComponent';  
//import Edit from './components/editComponent';
//import Index from './components/indexComponent';


// Accounts
import createAccount from './components/createAccountComponent';
import listLogins from './components/listLoginsComponent';
import editAccount from './components/adminEditComponent';

// Stations
import CreateStation from './components/CreateStationComponent';
import EditStation from './components/EditStationComponent';
import IndexStation from './components/IndexStationComponent';
// Logins
  import Login from './components/loginComponent';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="">
              <Link to={'/'} className="navbar-brand">Eftertanken</Link>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={'/'} className="nav-link">Start</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/create'} className="nav-link navbarSupportedContent">Registera bensinstation</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/station/index'} className="nav-link">Lista bensinstationer</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/admin/add'} className="nav-link">Skapa konto</Link>
                </li> 
                <li className="nav-item">
                  <Link to={'/user/login'} className="nav-link">Logga in</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/admin/logins'} className="nav-link">Lista konton</Link>
                </li>
              </ul>
            </div>
          </nav> <br />

          <h1 className="mt-5">Välkommen till eftertanken!</h1>
          <Switch>
            <Route exact path='/create' component={ CreateStation } />
            <Route path='/edit/:id' component={ EditStation } />
            <Route path='/station/index' component={ IndexStation } />
            <Route path='/user/login' component={ Login } /> 
            <Route path='/admin/logins' component={ listLogins } />
            <Route path='/admin/editAccount/:id' component={ editAccount } />
            <Route exact path='/admin/add' component={ createAccount } />
          </Switch>
          </div>
        
        { //<div style={{paddingBottom: 20}}> 
        } 
          <footer style={{position: "absolute", left: 0, bottom: 0, right: 0}} className="navbar footer py-2 bg-dark text-white" />
        { //</div> 
        }
        
        </Router>
    );
  }
}

export default App;
