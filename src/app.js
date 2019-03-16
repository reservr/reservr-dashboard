import React from "react";
import { Route, Link } from "react-router-dom";
import HomePage from "./homepage.react";
import Signup from "./signup.react";
import Login from "./login.react";
import Dashboard from "./dashboard.react";
import withAuthentication from "./decorators/withAuthentication";
import "../node_modules/spectre.css/dist/spectre.css";
import "./styles.css";

const App = () => (
    <div>
        <ul>
            <li>
                <Link to="/">Homepage</Link>
            </li>
            <li>
                <Link to="/signup">Signup</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
        </ul>
        <Route path="/" exact component={ HomePage } />
        <Route path="/signup" exact component={ Signup } />
        <Route path="/login" exact component={ Login } />
        <Route path="/dashboard" exact component={ withAuthentication( Dashboard ) } />
    </div>
);

export default App;
