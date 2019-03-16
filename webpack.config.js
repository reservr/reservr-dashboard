const path = require( "path" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );

module.exports = {
    mode: "development",
    entry: "./src/appRoot.js",
    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "app.bundle.js",
    },
    plugins: [
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
