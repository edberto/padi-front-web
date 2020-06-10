import React, { Component } from "react";

class Login extends Component {
    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                    <h4>Sign In</h4>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter username" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    {/* <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div> */}

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