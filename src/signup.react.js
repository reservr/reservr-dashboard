import React, { useState } from "react";
import { Formik } from "formik";
import { withRouter, Link } from "react-router-dom";
import ApiService from "./services/apiService";
import withStore from "./decorators/withStore";

const INITIAL_VALUES = { username: "", password: "", orgName: "" };
const MIN_ORGNAME_CHARACTER_LENGTH = 3;

const Signup = ( props ) => {
    const [ orgnameAvailability, setOrgnameAvailability ] = useState( "" );
    return (
        <Formik
            initialValues={ INITIAL_VALUES }
            validate={ validate }
            onSubmit={ onSubmit( props.history, props.updateStore ) }
        >
            {signupForm( setOrgnameAvailability, orgnameAvailability, props.messageCenter, props.updateStore )}
        </Formik>
    );
};

function signupForm ( setOrgnameAvailability, orgnameAvailability, messageCenter, updateStore ) {
    return props => {
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

        const orgnameIcon = orgnameAvailability;

        return (
            <div className="container grid-lg page-auth page-signup">
                { messageCenter.visible && (
                    <div className={ `toast ${ messageCenter.type }` }>
                        <button className="btn btn-clear float-right" onClick={ hideMessageCenter( updateStore ) } />
                        { messageCenter.message }
                    </div>
                ) }
                <div className="columns">
                    <div className="column col-4 col-lg-5 col-md-6 col-sm-8 col-xs-12 col-mx-auto">
                        <h4>Signup</h4>
                        <form onSubmit={ handleSubmit } autoComplete="on">
                            <div className={ `form-group form-group-orgname ${ orgNameErrorClass }` }>
                                <label
                                    className="form-label"
                                    htmlFor="org-name"
                                />
                                <div className="input-group has-icon-right">
                                    <span className="input-group-addon">reservr.com/</span>
                                    <input
                                        className="form-input"
                                        id="org-name"
                                        type="text"
                                        name="orgName"
                                        onChange={ handleChange }
                                        onBlur={ customHandleBlur( handleBlur, setOrgnameAvailability ) }
                                        value={ values.orgName }
                                        placeholder="funny-bakers"
                                    />
                                    { orgnameIcon && ( <i className={ `form-icon ${ orgnameIcon }` } /> ) }
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
                            <div className="clearfix">
                                <button type="submit" disabled={ isSubmitting } className="float-right btn btn-primary">
                                    Submit
                                </button>
                                <Link to="/login" className="btn btn-link">Go to Login page</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

function hideMessageCenter( updateStore ) {
    return () => {
        updateStore( "messageCenter", {
            visible: false,
            message: "",
            type: "",
        } );
    };
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

    if ( values.orgName.length < MIN_ORGNAME_CHARACTER_LENGTH ) {
        errors.orgName = "Organisation name must be at least 3 characters long";
    }

    if ( !values.password ) {
        errors.password = "Required";
    }

    return errors;
}

function customHandleBlur( handleBlur, setOrgnameAvailability ) {
    return evt => {
        evt.persist();
        const orgname = getSlug( evt.target.value );
        if ( orgname.length >= MIN_ORGNAME_CHARACTER_LENGTH ) {
            setOrgnameAvailability( "loading" );
            ApiService.checkOrgNameAvailability( orgname ).then( ( res ) => {
                if ( res.message === "success" && res.orgs === 0 ) {
                    setOrgnameAvailability( "icon icon-check text-success" );
                }

                if ( res.message === "success" && res.orgs > 0 ) {
                    setOrgnameAvailability( "icon icon-cross text-error" );
                }

                handleBlur( evt );
            } );
        } else {
            setOrgnameAvailability( "" );
            handleBlur( evt );
        }
    };
}

function getSlug( orgname ) {
    return orgname.toLowerCase().split( " " ).join( "-" );
}

function onSubmit( history, updateStore ) {
    return ( values, { setSubmitting } ) => {
        const data = Object.assign( {}, { userType: "admin" }, values );
        ApiService.signup( data ).then( () => {
            setSubmitting( false );
            updateStore( "isLoggedIn", true );
            history.push( "/dashboard" );
        } ).catch( err => {
            setSubmitting( false );
            updateStore( "messageCenter", {
                visible: true,
                message: err,
                type: "toast-error",
            } );
        } );
    };
}
const mapStoreToProps = ( store ) => ( {
    messageCenter: store.getMessageCenter(),
} );

export default withStore( mapStoreToProps )( withRouter( Signup ) );
