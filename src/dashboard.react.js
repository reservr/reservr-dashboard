import React from "react";
import withStore from "./decorators/withStore";

const Dashboard = () => ( <div>dashboard page</div> );

const mapStoreToProps = store => ( {
    isLoggedIn: store.getLoggedIn(),
} );

export default withStore( mapStoreToProps )( Dashboard );
