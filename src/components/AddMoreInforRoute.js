import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AddMoreInforRoute({
    component: Component,
    authenticated,
    authIdentify,
    handleDisplayNameChange,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (authenticated && authIdentify) {
                    return <Redirect to="/chat" />;
                } else if (authenticated && !authIdentify) {
                    return (
                        <Component
                            {...props}
                            handleDisplayNameChange={handleDisplayNameChange}
                        />
                    );
                } else {
                    return <Redirect to="/signin" />;
                }
            }}
        />
    );
}
