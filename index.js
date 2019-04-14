require( "@babel/polyfill" );
require( "@babel/register" )( {
    presets: [ require.resolve( "@babel/preset-env" ), require.resolve( "@babel/preset-react" ) ],
    plugins: [ require.resolve( "@babel/plugin-proposal-class-properties" ) ],
} );
require( "ignore-styles" ).default( [ ".css", ".sass", ".scss" ] );

require( "./server" );
