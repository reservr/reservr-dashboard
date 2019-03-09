import React from "react";
import StoreContext from "./storeContext";

const withStore = ( mapStoreToProps ) => ( Component ) => {
    const computeProps = ( store, props ) => {
        if ( mapStoreToProps ) {
            return Object.assign( {}, mapStoreToProps( store ), props );
        }

        return props;
    };

    const WithStoreComponent = ( props ) => (
        <StoreContext.Consumer>
            {( { store, updateStore } ) => (
                <Component { ...computeProps( store, props ) } updateStore={ updateStore } />
            )}
        </StoreContext.Consumer>
    );

    return WithStoreComponent;
};

export default withStore;
