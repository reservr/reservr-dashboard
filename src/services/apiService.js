import fetchWrapper from "../helpers/fetchWrapper";
// import responseHelper from "./responseHelper";

const baseUrl = "http://localhost:8080";

const checkOrgNameAvailability = ( orgname ) => {
    const url = `${ baseUrl }/orgs?slug=${ orgname }`;
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
};
