import React, {useState, useCallback} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context'
import Users from './users/pages/Users';
import Auth from './users/pages/Auth';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userId, setUserId] = useState(null)
    const login = useCallback((uid) => {
        setIsLoggedIn(true)
        setUserId(uid)
    }, []);
    const logout = useCallback(() => {
        setIsLoggedIn(false)
        setUserId(null)
    }, []);
    let routes;
    if(isLoggedIn) {
        routes = (
            <Switch>
                <Route path="/" component={Users} exact />
                <Route path="/:userId/places" component={UserPlaces} exact />
                <Route path="/places/new" component={NewPlace} exact />
                <Route path="/places/:placeId" component={UpdatePlace} exact />
                <Redirect to="/" />
            </Switch>
        );
    }else {
        routes = (
            <Switch>
                <Route path="/" component={Users} exact />
                <Route path="/:userId/places" component={UserPlaces} exact />
                <Route path="/auth" component={Auth} exact />
                <Redirect to="/auth" />
            </Switch>
        )
    }
    return (
        <AuthContext.Provider value={{isLoggedIn, userId, login, logout}}>
            <Router>
                <MainNavigation />
                <main>
                    {routes}
                </main>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
