import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./homepage.react";
import Signup from "./signup.react";
import Login from "./login.react";
import Dashboard from "./dashboard.react";
import Events from "./events.react";
import Reservations from "./reservations.react";
import withAuthentication from "./decorators/withAuthentication";
import "../node_modules/spectre.css/dist/spectre-icons.css";
import "../node_modules/spectre.css/dist/spectre.css";
import "./styles.css";

const App = () => (
    <div>
        <Route path="/" exact component={ HomePage } />
        <Route path="/signup" exact component={ Signup } />
        <Route path="/login" exact component={ Login } />
        <Route path="/dashboard" exact component={ withAuthentication( Dashboard ) } />
        <Route path="/dashboard/events" exact component={ withAuthentication( Events ) } />
        <Route path="/dashboard/reservations" exact component={ withAuthentication( Reservations ) } />
    </div>
);

export default App;
