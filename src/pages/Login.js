import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onLogin = e => {
        e.preventDefault();
        axios.post(this.PROXY_URL + 'https://padi-bangkit.herokuapp.com/login', { username: this.state.username, password: this.state.password })
            .then(response => {
                // console.log("masuk");
                // console.log(response);
                if (response.data.message === "Success"){
                    // console.log("Success");
                    localStorage.setItem('auth-token', response.data.data.access_token);
                    localStorage.setItem('username', this.state.username);
                    // console.log("XXXXXX");
                    // console.log(localStorage.getItem('auth-token'));
                    this.props.history.push('/');
                }
                else {
                    console.log("Wrong message");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const {username, password} = this.state

        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.onLogin}>
                        <h4>Sign In</h4>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" name="username"
                                placeholder="Enter username" value={username} onChange={this.changeHandler} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password"
                                placeholder="Enter password" value={password} onChange={this.changeHandler} />
                        </div>

                        <button type="submit" className="btn btn-success btn-block">Submit</button>
                        <p className="forgot-password text-right">
                            Don't have an account? <a href="/register">Enter</a>
                        </p>
                    </form>
                </div>
            </div>

        );
    }
}

export default Login;