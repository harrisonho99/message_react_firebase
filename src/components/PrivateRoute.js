import React from "react";
import { Route, Redirect } from "react-router-dom";
export default function PrivateRoute({
    component: Component,
    authenticated,
    authIdentify,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (authenticated && authIdentify) {
                    return <Component {...props} />;
                } else if (authenticated && !authIdentify) {
                    return (
                        <Redirect
                            to={{
                                pathname: "./addmoreinfor",
                                state: { from: props.location },
                            }}
                        />
                    );
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "./signin",
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
}
