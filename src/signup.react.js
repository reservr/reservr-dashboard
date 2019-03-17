import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import ApiService from "./services/apiService";
import withStore from "./decorators/withStore";

const INITIAL_VALUES = { username: "", password: "", orgName: "" };

const Signup = ( props ) => (
    <Formik
        initialValues={ INITIAL_VALUES }
        validate={ validate }
        onSubmit={ onSubmit( props.history, props.updateStore ) }
    >
        {signupForm}
    </Formik>
);

function signupForm ( props ) {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = props;

    const userNameError = errors.username && touched.username;
    const userNameErrorClass = userNameError && "has-error";

    const orgNameError = errors.orgName && touched.orgName;
    const orgNameErrorClass = orgNameError && "has-error";

    return (
        <div className="container grid-lg page-auth page-signup">
            <div className="columns">
                <div className="column col-4 col-lg-5 col-md-6 col-sm-8 col-xs-12 col-mx-auto">
                    <h4>Signup</h4>
                    <form onSubmit={ handleSubmit } autoComplete="on">
                        <div className={ `form-group form-group-orgname ${ orgNameErrorClass }` }>
                            <label
                                className="form-label"
                                htmlFor="org-name"
                            >
                                Organisation name:
                            </label>
                            <div className="input-group">
                                <span className="input-group-addon">reservr.com/</span>
                                <input
                                    className="form-input"
                                    id="org-name"
                                    type="text"
                                    name="orgName"
                                    onChange={ handleChange }
                                    onBlur={ handleBlur }
                                    value={ values.orgName }
                                    placeholder="funny-bakers"
                                />
                            </div>
                            {orgNameError && ( <p className="form-input-hint">{ errors.orgName }</p> )}
                        </div>

                        <div className={ `form-group ${ userNameErrorClass }` }>
                            <label
                                className="form-label"
                                htmlFor="email"
                            >
                                Email:
                            </label>
                            <input
                                className="form-input"
                                id="email"
                                type="email"
                                name="username"
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                value={ values.username }
                                autoComplete="email"
                            />
                            {userNameError && ( <p className="form-input-hint">{ errors.username }</p> )}
                        </div>

                        <div className="form-group">
                            <label
                                className="form-label"
                                htmlFor="org-name"
                            >
                                Password:
                            </label>
                            <input
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
            </div>
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

    if ( !values.orgName ) {
        errors.orgName = "Required";
    }

    if ( !values.password ) {
        errors.password = "Required";
    }

    return errors;
}

function onSubmit( history, updateStore ) {
    return ( values, { setSubmitting } ) => {
        const data = Object.assign( {}, { userType: "admin" }, values );
        ApiService.signup( data ).then( () => {
            setSubmitting( false );
            updateStore( "isLoggedIn", true );
            history.push( "/dashboard" );
        } );
    };
}
const mapStoreToProps = ( store ) => ( {
    isLoggedIn: store.getLoggedIn(),
} );

export default withStore( mapStoreToProps )( withRouter( Signup ) );
