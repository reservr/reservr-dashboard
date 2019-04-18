const path = require( "path" );
const webpack = require( "webpack" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
require( "dotenv" ).config();

const envVars = [
    "NODE_ENV",
];

const envObj = Object.keys( process.env )
    .filter( key => envVars.indexOf( key ) > -1 )
    .reduce( ( object, key ) => {
        object[ `process.env.${ key }` ] = JSON.stringify( process.env[ key ] );
        return object;
    }, {} );

console.log( envObj );

module.exports = {
    mode: "development",
    entry: "./src/appRoot.js",
    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "app.bundle.js",
    },
    plugins: [
        new webpack.DefinePlugin( envObj ),
        new MiniCssExtractPlugin( ),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ {
                    loader: MiniCssExtractPlugin.loader,
                }, "css-loader" ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
};
