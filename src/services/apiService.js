import fetchWrapper from "../helpers/fetchWrapper";
// import responseHelper from "./responseHelper";

const baseUrl = process.env.NODE_ENV === "production" ? "http://reservr-staging.reservr.net/api" : "http://localhost:9001";

const checkOrgNameAvailability = ( orgname ) => {
    const url = `${ baseUrl }/orgs?slug=${ orgname }`;
    return fetchWrapper( url );
};

const getOrg = () => {
    const url = `${ baseUrl }/orgs`;
    return fetchWrapper( url );
};

const getUser = () => {
    const url = `${ baseUrl }/users`;
    return fetchWrapper( url );
};

const login = ( values ) => {
    const url = `${ baseUrl }/login`;
    const options = {
        method: "POST",
        body: JSON.stringify( values ),
    };
    return fetchWrapper( url, options );
};

const signup = ( values ) => {
    const url = `${ baseUrl }/signup`;
    const options = {
        method: "POST",
        body: JSON.stringify( values ),
    };
    return fetchWrapper( url, options );
};

const logout = () => {
    const url = `${ baseUrl }/logout`;
    return fetchWrapper( url, {} );
};

export default {
    checkOrgNameAvailability,
    login,
    signup,
    logout,
    getOrg,
    getUser,
};
