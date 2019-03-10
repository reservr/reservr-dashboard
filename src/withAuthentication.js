import React from "react";
import { Redirect } from "react-router-dom";
import withStore from "./withStore";

export default function withAuthentication( WrappedComponent ) {
    const WithAuthentication = props => {
        if ( !props.isLoggedIn ) {
            return <Redirect to="/login" />;
        }

        return <WrappedComponent { ...props } />;
    };

    const mapStoreToProps = store => ( {
        isLoggedIn: store.getLoggedIn(),
    } );

    return withStore( mapStoreToProps )( WithAuthentication );
}
