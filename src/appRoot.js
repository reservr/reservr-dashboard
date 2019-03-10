import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";
import StoreContext from "./storeContext";
import createStore from "./store";

const store = createStore();
if ( window.RESERVR_STORE_INITIAL_DATA ) {
    const serverState = window.RESERVR_STORE_INITIAL_DATA;
    if ( serverState.isLoggedIn ) {
        store.setValue( "isLoggedIn", serverState.isLoggedIn );
    }
}
const RoutedApp = () => (
    <StoreContext.Provider store={ store }>
        <Router>
            <App />
        </Router>
    </StoreContext.Provider>
);

ReactDOM.render( <RoutedApp />, document.querySelector( ".react-root" ) );
