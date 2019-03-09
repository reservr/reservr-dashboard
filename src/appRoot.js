import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";

const RoutedApp = () => (<Router><App /></Router>);

ReactDOM.render(<RoutedApp />, document.querySelector( ".react-root" ));
