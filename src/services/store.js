export default function createStore() {
    const state = {
        isLoggedIn: false,
    };

    return {
        setValue( key, value ) {
            state[ key ] = value;
        },

        getLoggedIn() {
            return state.isLoggedIn;
        },
    };
}
