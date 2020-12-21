import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PubblicRoute({
    component: Component,
    authenticated,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated === false ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/chat" />
                )
            }
        />
    );
}
