import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import UploadImage from "./pages/UploadImage";
import History from "./pages/History";
import Result from "./pages/Result";

function App() {
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
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li> */}
          </ul>
        </div>
      </nav>

      <Switch>
        <Route exact path='/' component={UploadImage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={SignUp} />
        <Route path="/history" component={History} />
        <Route path="/result" component={Result} />
      </Switch>

    </div></Router>
  );
}

export default App;