import React from "react";
import express from "express";
import cookieParser from "cookie-parser";

import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./src/app";
import StoreContext from "./src/storeContext";
import createStore from "./src/store";

const PORT = 8082;
const app = express( );
app.use( express.static( `${ __dirname }/dist` ) );
app.use( cookieParser() );

app.get( "/*", function( req, res ) {
    const store = createStore();

    if ( req.cookies[ "connect.sid" ] ) {
        store.setValue( "isLoggedIn", true );
    }

    const RESERVR_STORE_INITIAL_DATA = {
        isLoggedIn: store.getLoggedIn(),
    };

    const context = {};
    const reactApp = (
        <StoreContext.Provider store={ store }>
            <StaticRouter location={ req.url } context={ context }>
                <App />
            </StaticRouter>
        </StoreContext.Provider>
    );

    const html = ReactDOMServer.renderToString( reactApp );

    res.send( `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>dashboard</title>
    </head>
    <body>
        <h1>Dashboard</h1>
        <div class="react-root">${ html }</div>
        <script>window.RESERVR_STORE_INITIAL_DATA = ${ JSON.stringify( RESERVR_STORE_INITIAL_DATA ) }</script>
        <script src="/app.bundle.js"></script>
    </body>
    </html>` );
} );
app.listen( PORT );
