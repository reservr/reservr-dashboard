import React from "react";
import express from "express";

import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./src/app";
import StoreContext from "./src/storeContext";
import createStore from "./src/store";

const PORT = 8082;
const app = express( );
app.use( express.static( `${ __dirname }/dist` ) );

app.get( "/*", function( req, res ) {
    const store = createStore();
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
        <script src="/app.bundle.js"></script>
    </body>
    </html>` );
} );
app.listen( PORT );
