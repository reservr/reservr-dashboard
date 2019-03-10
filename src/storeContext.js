import React from "react";

const { Provider, Consumer } = React.createContext( {
    store: null,
    updateStore: () => {},
} );

class StoreProvider extends React.Component {
    // eslint-disable-next-line react/sort-comp
    updateStore = ( key, value ) => {
        this.state.store.setValue( key, value );
        this.setState( {
            store: this.state.store,
        } );
    };

    state = {
        store: this.props.store,
        updateStore: this.updateStore, // eslint-disable-line react/no-unused-state
    };

    render() {
        return <Provider value={ this.state }>{this.props.children}</Provider>;
    }
}

export default { Provider: StoreProvider, Consumer };
