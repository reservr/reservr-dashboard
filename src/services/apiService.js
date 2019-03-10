import fetchWrapper from "../helpers/fetchWrapper";
// import responseHelper from "./responseHelper";

const baseUrl = "http://localhost:8080";

const login = ( values ) => {
    const url = `${ baseUrl }/login`;
    const options = {
        method: "POST",
        body: JSON.stringify( values ),
    };
    return fetchWrapper( url, options );
};

export default {
    login,
};
