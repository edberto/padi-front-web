import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute'

import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import UploadImage from "./pages/UploadImage";
import History from "./pages/History";
import Result from "./pages/Result";

class App extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const auth_token = localStorage.getItem('auth-token');
    // const { history } = this.props;
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
          localStorage.removeItem('auth-token');
          localStorage.removeItem('username');
          this.props.history.push('/login');
        }
        else {
          console.log("Wrong message");
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    // console.log(localStorage.getItem('auth-token'));
  }

  render() {
    const isAuthenticated = localStorage.getItem('auth-token') === null
    const token = localStorage.getItem('auth-token');
    // const { navigate } = this.state

    // if (navigate) {
    //   return <Redirect to="/login" push={true} />;
    // }

    return (<Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          {
            (localStorage.getItem('username') === null) ?
              <Link className="navbar-brand" to={"/"}>PADI</Link> :
              <Link className="navbar-brand" to={"/login"}>PADI</Link>
          }
          {/* <Link className="navbar-brand" to={"/"}>PADI</Link> */}
          {(localStorage.getItem('username') !== null) ?
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/history"}>History</Link>
                </li>
                <li className="dropdown nav-item">
                  <a aria-expanded="false" aria-haspopup="true" className="dropdown-toggle nav-link" data-toggle="dropdown"
                    href="" role="button">{localStorage.getItem('username')}<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <a className="dropdown-item" onClick={this.logout}>Logout</a>
                  </ul>
                </li>
              </ul>
            </div> : <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            </div>}

        </nav>

        <Switch>
          <Route exact path='/' component={UploadImage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          <Route path="/history" component={History} />
          <Route path="/result" component={Result} />
          {/* <ProtectedRoute token={token} exact path="/" component={UploadImage} />
          <ProtectedRoute token={token} path="/login" component={Login} />
          <ProtectedRoute token={token} exact path="/register" component={SignUp} />
          <ProtectedRoute token={token} path="/history" component={History} /> */}
        </Switch>

        <div className="footer">
          <p>&#169; Made by Rio, Edbert, and Josua</p>
        </div>

      </div></Router>
    );
  }

}

export default App;