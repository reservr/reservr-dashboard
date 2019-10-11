import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import withStore from "./decorators/withStore";
import ApiService from "./services/apiService";

import * as Yup from "yup";

const EventSchema = Yup.object().shape( {
    name: Yup.string()
        .min( 3 )
        .required(),
    description: Yup.string()
        .min( 3 )
        .required(),
    // images: Yup.array().of( Yup.object().shape( {
    //     path: Yup.string(),
    // } ) ),
    date: Yup.date().required(),
    seats: Yup.number()
        .integer()
        .min( 3 ),
    published: Yup.boolean(),
    reminders: Yup.boolean(),
    reservationsOpen: Yup.boolean(),
    prices: Yup.array().of( Yup.object().shape( {
        name: Yup.string(),
        amount: Yup.number(),
        currency: Yup.string(),
    } ) ),
    location: Yup.string()
        .min( 3 )
        .required(),
    invited: Yup.number().integer(),
    waiting: Yup.number().integer(),
} );

const INITIAL_VALUES = {
    name: "",
    description: "",
    seats: 0,
};

const CreateEvent = () => {
    const [ imageSrc, setImageSrc ] = useState( "" );

    return (
        <Formik
            initialValues={ INITIAL_VALUES }
            validationSchema={ EventSchema }
            onSubmit={ onSubmit() }
        >
            {( { errors, touched } ) => {
                const eventNameError = errors.name && touched.name;
                const eventNameErrorClass = eventNameError && "has-error";

                const eventDescriptionError = errors.description && touched.description;
                const eventDescriptionErrorClass = eventDescriptionError && "has-error";

                const eventSeatsError = errors.seats && touched.seats;
                const eventSeatsErrorClass = eventSeatsError && "has-error";

                return (
                    <Form className="events-create-form">
                        <div className="columns">
                            <div className="column col-5">
                                {!imageSrc && (
                                    <div className="empty">
                                        <div className="empty-icon">
                                            <i className="icon icon-photo" />
                                        </div>
                                        <p className="empty-title h5">This event has no images.</p>
                                        <p className="empty-subtitle">Click the button to upload an image.</p>
                                        <div className="empty-action">
                                            <button className="btn btn-primary">Upload image</button>
                                        </div>
                                        <input type="file" onChange={ handleImageOnChange( setImageSrc ) } name="" id="" className="image-upload" />
                                    </div>
                                )}
                                {imageSrc && (
                                    <div className="event-image-wrapper">
                                        <img src={ imageSrc } alt="" />
                                    </div>
                                )}
                            </div>
                            <div className="column col-7">
                                <div className={ `form-group ${ eventNameErrorClass }` }>
                                    <label className="form-label">Event name</label>
                                    <Field name="name" type="text" className="form-input" />
                                    {eventNameError && <p className="form-input-hint">{errors.name}</p>}
                                </div>

                                <div className={ `form-group ${ eventDescriptionErrorClass }` }>
                                    <label className="form-label">Event description</label>
                                    <Field name="description" type="textarea" className="form-input" component="textarea" />
                                    {eventDescriptionError && <p className="form-input-hint">{errors.description}</p>}
                                </div>

                                <div className={ `form-group ${ eventSeatsErrorClass }` }>
                                    <label className="form-label">Event seats</label>
                                    <Field name="seats" type="number" className="form-input" />
                                    {eventSeatsError && <p className="form-input-hint">{errors.seats}</p>}
                                </div>

                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

function handleImageOnChange( setImageSrc ) {
    return ( evt ) => {
        if ( evt.target.files && evt.target.files[ 0 ] ) {
            const reader = new FileReader();

            reader.onload = function( e ) {
                setImageSrc( e.target.result );
            };

            reader.readAsDataURL( evt.target.files[ 0 ] );
        }
    };
}

function onSubmit() {
    return ( values, { setSubmitting } ) => {
        setSubmitting( false );
    };
}

export default CreateEvent;
