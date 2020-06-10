import React, { Component } from "react";

export default class SignUp extends Component {
    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                    <h4>Sign Up</h4>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter username" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-success btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already have an account? <a href="/login">Enter</a>
                    </p>
                    </form>
                </div>
            </div>
            
        );
    }
}