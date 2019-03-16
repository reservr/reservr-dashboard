import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import ApiService from "./services/apiService";
import withStore from "./decorators/withStore";

const INITIAL_VALUES = { username: "", password: "" };

const Login = ( props ) => (
    <Formik
        initialValues={ INITIAL_VALUES }
        validate={ validate }
        onSubmit={ onSubmit( props.history, props.updateStore ) }
    >
        {loginForm}
    </Formik>
);

function loginForm ( props ) {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = props;

    return (
        <div className="container grid-lg">
            <div className="columns">
                <div className="column col-4 col-lg-5 col-md-6 col-sm-8 col-xs-12 col-mx-auto">
                    <h4>Login</h4>
                    <form onSubmit={ handleSubmit } autoComplete="on">
                        <div className="form-group">
                            <label
                                className="form-label"
                                htmlFor="input-example-1"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="username"
                                className="form-input"
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                value={ values.username }
                                autoComplete="email"
                            />
                            {errors.username && touched.username && errors.username}
                        </div>
                        <div className="form-group">
                            <label
                                className="form-label"
                                htmlFor="input-example-1"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                className="form-input"
                                type="password"
                                name="password"
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                value={ values.password }
                                autoComplete="password"
                            />
                            {errors.password && touched.password && errors.password}
                        </div>
                        <button type="submit" disabled={ isSubmitting } className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>{/* .columns */}
        </div>
    );
}

function validate ( values ) {
    const errors = {};
    if ( !values.username ) {
        errors.username = "Required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( values.username )
    ) {
        errors.username = "Invalid email address";
    }
    return errors;
}

function onSubmit( history, updateStore ) {
    return ( values, { setSubmitting } ) => {
        ApiService.login( values ).then( () => {
            setSubmitting( false );
            updateStore( "isLoggedIn", true );
            history.push( "/dashboard" );
        } );
    };
}

const mapStoreToProps = ( store ) => ( {
    isLoggedIn: store.getLoggedIn(),
} );

export default withStore( mapStoreToProps )( withRouter( Login ) );
