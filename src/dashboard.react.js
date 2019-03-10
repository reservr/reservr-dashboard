import React from "react";
import withStore from "./decorators/withStore";
import apiService from "./services/apiService";

const Dashboard = () => (
    <div>
        <h3>dashboard page</h3>
        <button onClick={ handleOnClick() }>Log out</button>
    </div>
);

function handleOnClick() {
    return () => apiService.logout().then( () => {
        window.location.href = "/";
    } );
}

const mapStoreToProps = store => ( {
    isLoggedIn: store.getLoggedIn(),
} );

export default withStore( mapStoreToProps )( Dashboard );
