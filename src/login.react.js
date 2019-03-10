import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import ApiService from "./apiService";

const INITIAL_VALUES = { username: "", password: "" };

const Login = ( props ) => (
    <Formik
        initialValues={ INITIAL_VALUES }
        validate={ validate }
        onSubmit={ onSubmit( props.history ) }
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
        <form onSubmit={ handleSubmit } autoComplete="on">
            <input
                type="email"
                name="username"
                onChange={ handleChange }
                onBlur={ handleBlur }
                value={ values.username }
                autoComplete="email"
            />
            {errors.username && touched.username && errors.username}
            <input
                type="password"
                name="password"
                onChange={ handleChange }
                onBlur={ handleBlur }
                value={ values.password }
                autoComplete="password"
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={ isSubmitting }>
                    Submit
            </button>
        </form>
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

function onSubmit( history ) {
    return ( values, { setSubmitting } ) => {
        ApiService.login( values ).then( res => {
            setSubmitting( false );
            console.log( res );
            history.push( "/dashboard" );
        } );
    };
}
export default withRouter( Login );
