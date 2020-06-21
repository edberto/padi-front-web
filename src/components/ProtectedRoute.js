import React from "react";
import { Redirect, Route } from "react-router";

export default function ProtectedRoute({path, exact, component, token}) {
    if (token === null) {
        return <Redirect to="/login" />
    } else {
        return <Route path={path} exact={exact} component={component} />
    }
}