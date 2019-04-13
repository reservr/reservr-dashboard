import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import withStore from "./decorators/withStore";
import ApiService from "./services/apiService";

/*

const eventSchema = Joi.object().keys( {
    name: Joi.string()
        .min( 3 )
        .required(),
    orgId: Joi.string()
        .min( 3 )
        .required(),
    description: Joi.string()
        .min( 3 )
        .required(),
    images: Joi.array().items( Joi.object().keys( {
        path: Joi.string()
    } ) ),
    date: Joi.date().required(),
    seats: Joi.number()
        .integer()
        .min( 3 ),
    published: Joi.boolean(),
    reminders: Joi.boolean(),
    reservationsOpen: Joi.boolean(),
    prices: Joi.array().items( Joi.object().keys( {
        name: Joi.string(),
        amount: Joi.number(),
        currency: Joi.string()
    } ) ),
    location: Joi.string()
        .min( 3 )
        .required(),
    timecreated: Joi.date().required(),
    invited: Joi.number().integer(),
    waiting: Joi.number().integer()
} );

*/

const INITIAL_VALUES = {
    name: "",
    description: "",
};

const CreateEvent = () => (
    <Formik
        initialValues={ INITIAL_VALUES }
        validate={ validate }
        onSubmit={ onSubmit() }
    >
        {eventForm}
    </Formik>
);

function eventForm ( props ) {
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
            <div className="form-group">
                <label
                    className="form-label"
                    htmlFor="name"
                >
                    Event name
                </label>
                <input
                    id="name"
                    type="name"
                    name="username"
                    className="form-input"
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    value={ values.name }
                    autoComplete="name"
                />
                {errors.name && touched.name && errors.name}
                <div className="clearfix">
                    <button type="submit" disabled={ isSubmitting } className="btn btn-primary float-right">
                        Submit
                    </button>
                    <Link to="/signup" className="btn btn-link">Go to Signup page</Link>
                </div>
            </div>
        </form>
    );
}

function validate ( values ) {
    const errors = {};
    if ( !values.name ) {
        errors.name = "Required";
    }
    return errors;
}

function onSubmit() {
    return ( values, { setSubmitting } ) => {
        setSubmitting( false );
    };
}

export default CreateEvent;
