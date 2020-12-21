import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from "../helpers/auth";
import Form from "../components/Form/";
import Progress from "../components/Progress";
import { Toolbar } from "@material-ui/core";

export default class SignUp extends Component {
    state = {
        error: null,
        isLoading: true,
    };

    handleFormSignUp = async (values, setSubmitting) => {

        this.setState({ error: "" });

        signup(values.email, values.password)
            .then(() => {
                setSubmitting(false);
            })
            .catch((error) => {
                this.setState({ error: error.message });
                setSubmitting(false);
            });
    };
    componentDidMount() {
        this.setState({ isLoading: false });
    }
    componentDidUpdate() {
        window.clearTimeout(this.formSubmiting);
    }
    render() {
        return this.state.isLoading ? (
            <Progress />
        ) : (
            <div className="form-wrapper">
                <Toolbar />
                <Form
                    buttonLabel="REGISTER"
                    header="SIGN UP"
                    onFormSubmit={this.handleFormSignUp}
                    color="secondary"
                >
                    <div>
                        <p
                            style={{
                                marginBottom: 10,
                                color: "#ff3d00",
                            }}
                        >
                            {this.state.error}
                        </p>
                        <span>Are you already have an account ? </span>
                        <Link to="/signin">Log In</Link>
                    </div>
                </Form>
            </div>
        );
    }
}
