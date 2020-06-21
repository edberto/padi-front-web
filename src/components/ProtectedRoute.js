import React from "react";
import { Redirect, Route } from "react-router";
import Login from '../pages/Login';

export default function ProtectedRoute({path, exact, component, token}) {
    if (token === null) {
        console.log("kosong");
        return <Redirect to="/login" />
        // return <Route path='/login' component={Login} />
    } else {
        return <Route path={path} exact={exact} component={component} />
    }
}