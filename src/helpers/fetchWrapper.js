const SUCCESS = 200;
const ERROR = 400;
const SERVER_ERROR = 500;

const parseResponse = ( status, res ) => {
    if ( status >= SERVER_ERROR ) {
        return Promise.reject( new Error( status ) );
    }

    return new Promise( ( resolve, reject ) => {
        if ( status >= SUCCESS && status < ERROR ) {
            res.then( response => resolve( response ) );
        } else if ( status >= ERROR && status < SERVER_ERROR ) {
            // TODO: show error to user
            res.then( response => reject( new Error( response.message ) ) );
        } else {
            res.then( response => reject( new Error( response ) ) );
        }
    } );
};

const fetchWrapper = ( url, opts ) => {
    const options = Object.assign( {}, {
        method: "GET",
        mode: "cors",
        cache: "default",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }, opts );
    return fetch( url, options ).then( res => parseResponse( res.status, res.json() ) );
};

export default fetchWrapper;
