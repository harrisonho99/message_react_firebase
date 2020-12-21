import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AppBar from "./components/AppBar";
import PubblicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import { auth } from "./services/firebase";
import Progress from "./components/Progress";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import AddMoreInfor from "./pages/AddMoreInfor";
import AddMoreInforRoute from "./components/AddMoreInforRoute";

export default class App extends React.Component {
    state = {
        loading: true,
        authenticated: false,
        innerHeight: 0,
        authIdentify: false,
    };
    handleWindowResize = () => {
        this.setState({
            innerHeight: document.body.offsetHeight,
        });
    };
    componentDidMount() {
        this.setState({ innerHeight: document.body.offsetHeight });
        window.onresize = () => {
            this.handleWindowResize();
        };
        auth().onAuthStateChanged((user) => {
            if (user && !user.displayName) {
                this.timeOutFakingLoadingUserGetIn = setTimeout(() => {
                    this.setState({
                        loading: false,
                        authenticated: true,
                        authIdentify: false,
                    });
                }, 200);
            } else if (user && user.displayName) {
                this.timeOutFakingLoadingUserGetIn = setTimeout(() => {
                    this.setState({
                        loading: false,
                        authenticated: true,
                        authIdentify: true,
                    });
                }, 200);
            } else {
                this.timeOutFakingLoadingUserGetOut = setTimeout(() => {
                    this.setState({
                        authenticated: false,
                        loading: false,
                        authIdentify: false,
                    });
                }, 0);
            }
        });
    }
    handleDisplayNameChange = (value) => {
        this.setState({
            authIdentify: value,
        });
    };

    componentWillUnmount() {
        window.clearTimeout(this.timeOutFakingLoadingUserGetIn);
        window.clearTimeout(this.timeOutFakingLoadingUserGetOut);
        window.removeEventListener("resize", this.handleWindowResize);
    }

    render() {
        return this.state.loading === true ? (
            <Progress />
        ) : (
            <div className="App">
                <Router>
                    <div
                        className="App-Container"
                        style={{
                            height: `${this.state.innerHeight - 146}px`,
                            position: "absolute",
                            top: "60px",
                            left: "0px",
                        }}
                    >
                        <AppBar />
                        <Switch>
                            <Route exact path="/" component={Home} />

                            <PubblicRoute
                                path="/signup"
                                component={Signup}
                                authenticated={this.state.authenticated}
                            />

                            <PubblicRoute
                                path="/signin"
                                component={Login}
                                authenticated={this.state.authenticated}
                            />
                            <PrivateRoute
                                path="/chat"
                                authenticated={this.state.authenticated}
                                component={Chat}
                                authIdentify={this.state.authIdentify}
                            />
                            <AddMoreInforRoute
                                path="/addmoreinfor"
                                authenticated={this.state.authenticated}
                                authIdentify={this.state.authIdentify}
                                component={AddMoreInfor}
                                handleDisplayNameChange={
                                    this.handleDisplayNameChange
                                }
                            />
                            <Route component={NotFoundPage} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
