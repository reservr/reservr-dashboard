import React from "react";
import withStore from "./decorators/withStore";

const HomePage = ( props ) => ( <div>Home page { props.isLoggedIn ? "tru" : "fals" }</div> );

const mapStoreToProps = store => ( {
    isLoggedIn: store.getLoggedIn(),
} );

export default withStore( mapStoreToProps )( HomePage );
