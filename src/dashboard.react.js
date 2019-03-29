import React, { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Events from "./events.react";
import Reservations from "./reservations.react";
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
        <div className="container-dashboard">
            <header>
                <Link className="branding" to="/">reservr</Link>
                <Link className="nav-link log-out" to="/" onClick={ handleOnClick }>
                    <i className="icon icon-shutdown" /> Log out
                </Link>
            </header>
            <div className="content">
                <aside>
                    <ul className="nav">
                        <li><Link to="/dashboard/events">Events</Link></li>
                        <li><Link to="/dashboard/organization">Organization settings</Link></li>
                    </ul>
                </aside>
                <section>
                    <div className="section-wrapper">
                        <Switch>
                            <Route path="/dashboard/events" exact component={ Events } />
                            <Route path="/reservations" exact component={ Reservations } />
                        </Switch>
                    </div>
                </section>
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
