import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./homepage.react";
import Signup from "./signup.react";
import Login from "./login.react";
import Dashboard from "./dashboard.react";

import withAuthentication from "./decorators/withAuthentication";
// import withStore from "./decorators/withStore";
import "../node_modules/spectre.css/dist/spectre-icons.css";
import "../node_modules/spectre.css/dist/spectre.css";
import "./styles.css";

const App = () => (
    <div className="app-root">
        <Route path="/" exact component={ HomePage } />
        <Route path="/signup" component={ Signup } />
        <Route path="/login" component={ Login } />
        <Route path="/dashboard" component={ withAuthentication( Dashboard ) } />
    </div>
);

export default App;
