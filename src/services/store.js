export default function createStore() {
    const state = {
        isLoggedIn: false,
        user: {},
        org: {},
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

        getUser() {
            return state.user;
        },

        getOrg() {
            return state.org;
        },

        getMessageCenter() {
            return state.messageCenter;
        },
    };
}
