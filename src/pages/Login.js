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
        console.log("akan login");
        console.log(localStorage.getItem("auth-token"));
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
                    this.props.history.push('/predict');
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
                        <h4>Login</h4>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" name="username"
                                placeholder="Masukkan username" value={username} onChange={this.changeHandler} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password"
                                placeholder="Masukkan password" value={password} onChange={this.changeHandler} />
                        </div>

                        <button type="submit" className="btn btn-success btn-block">Masuk</button>
                        <p className="forgot-password text-right">
                            Belum mempunyai akun? <a href="/register">Registrasi</a>
                        </p>
                    </form>
                </div>
            </div>

        );
    }
}

export default Login;