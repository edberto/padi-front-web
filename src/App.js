import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import UploadImage from "./pages/UploadImage";
import History from "./pages/History";
import Result from "./pages/Result";
import Try from "./pages/Try";

class App extends Component {
  logout() {
    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const auth_token = localStorage.getItem('auth-token');
    // const history = useHistory();

    axios.delete(PROXY_URL + 'https://padi-bangkit.herokuapp.com/logout', {
      headers: {
        Authorization: 'Bearer ' + auth_token
      }
     })
      .then(response => {
        console.log("masuk");
        console.log(response);
        if (response.data.message === "Success") {
          console.log("Success");
          localStorage.removeItem('auth-token');
          localStorage.removeItem('username');
          // history.push('/login');
        }
        else {
          console.log("Wrong message");
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount(){
    // console.log(localStorage.getItem('auth-token'));
  }

  render() {
    return (<Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <Link className="navbar-brand" to={"/"}>PADI</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/history"}>History</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/result"}>Result</Link>
              </li>
              <li className="dropdown nav-item">
                <a aria-expanded="false" aria-haspopup="true" className="dropdown-toggle nav-link" data-toggle="dropdown"
                  href="#" role="button">Username<span className="caret"></span></a>
                <ul className="dropdown-menu">
                  {/* <Link className="dropdown-item" to={"/"} onClick={this.logout}>Logout</Link> */}
                  <a className="dropdown-item" onClick={this.logout}>Logout</a>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route exact path='/' component={UploadImage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          <Route path="/history" component={History} />
          <Route path="/result" component={Result} />
          <Route path="/try" component={Try} />
        </Switch>

        <div className="footer">
          <p>&#169; Made by Love</p>
        </div>

      </div></Router>
    );
  }

}

export default App;