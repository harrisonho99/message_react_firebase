import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin } from "../helpers/auth";
import Form from "../components/Form/";
import { Toolbar } from "@material-ui/core";
import Progress from "../components/Progress";
export default class SignUp extends Component {
    state = {
        error: null,
        isLoading: true,
    };

    componentDidMount() {
        this.setState({
            isLoading: false,
        });
    }
    handleFormSignIn = async (values, setSubmitting) => {
        this.setState({ error: "" });

        signin(values.email, values.password)
            .then(() => {
                setSubmitting(false);
            })
            .catch((error) => {
                this.setState({ error: error.message });
                console.log(error.message);
                setSubmitting(false);
            });
    };
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
                    buttonLabel="SIGN IN"
                    header="LOG IN"
                    onFormSubmit={this.handleFormSignIn}
                >
                    <div style={{ marginBottom: 10 }}>
                        <p
                            style={{
                                marginBottom: 10,
                                color: "#ff3d00",
                            }}
                        >
                            {this.state.error}
                        </p>
                        <span>Don't have an account ? </span>
                        <Link to="/signup">Sign Up Here</Link>
                    </div>
                </Form>
            </div>
        );
    }
}
