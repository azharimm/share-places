import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
    return (
        <Router>
            <MainNavigation />
            <main>
                <Switch>
                    <Route path="/" component={Users} exact />
                    <Route path="/:userId/places" component={UserPlaces} exact />
                    <Route path="/places/new" component={NewPlace} exact />
                    <Route path="/places/:placeId" component={UpdatePlace} exact />
                    <Redirect to="/" />
                </Switch>
            </main>
        </Router>
    );
};

export default App;
