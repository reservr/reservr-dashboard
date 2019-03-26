import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import withStore from "./decorators/withStore";
import apiService from "./services/apiService";

function Dashboard( props ) {
    useEffect( () => {
        const fetchData = async () => {
            const orgRes = await apiService.getOrg();
            const userRes = await apiService.getUser();

            props.updateStore( "org", orgRes.org );
            props.updateStore( "user", userRes.user );
        };

        fetchData();
    }, [] );

    return (
        <div>
            <header className="navbar">
                <section className="navbar-section">
                    <span>welcome { props.user.username }</span>
                    <Link to="/dashboard" className="navbar-brand mr-2">Dashboard</Link>
                    <Link to="/dashboard/events" className="mr-2">Events</Link>
                    <Link to="/dashboard/reservations" className="mr-2">Reservations</Link>
                </section>
                <section className="navbar-section">
                    <button className="btn btn-primary btn-sm" onClick={ handleOnClick() }>
                        <i className="icon icon-shutdown" /> Log out
                    </button>
                </section>
            </header>
            <div className="empty">
                <div className="empty-icon">
                    <i className="icon icon-people" />
                </div>
                <p className="empty-title h5">You have no new messages { props.org.name }</p>
                <p className="empty-subtitle">Click the button to start a conversation.</p>
                <div className="empty-action">
                    <button className="btn btn-primary">Send a message</button>
                </div>
            </div>

        </div>
    );
}

function handleOnClick() {
    return () => apiService.logout().then( () => {
        window.location.href = "/";
    } );
}

const mapStoreToProps = store => ( {
    isLoggedIn: store.getLoggedIn(),
    org: store.getOrg(),
    user: store.getUser(),
} );

export default withStore( mapStoreToProps )( Dashboard );
