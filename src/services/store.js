export default function createStore() {
    const state = {
        isLoggedIn: false,
        messageCenter: {
            visible: false,
            message: "",
            type: "",
        },
    };

    return {
        setValue( key, value ) {
            state[ key ] = value;
        },

        getLoggedIn() {
            return state.isLoggedIn;
        },

        getMessageCenter() {
            return state.messageCenter;
        },
    };
}
