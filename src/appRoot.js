import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";
import StoreContext from "./storeContext";
import createStore from "./store";

const RoutedApp = () => (
    <StoreContext.Provider store={ createStore() }>
        <Router>
            <App />
        </Router>
    </StoreContext.Provider>
);

ReactDOM.render( <RoutedApp />, document.querySelector( ".react-root" ) );
