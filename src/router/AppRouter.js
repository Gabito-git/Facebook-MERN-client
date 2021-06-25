import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { startChecking } from "../actions/auth";

import MainScreen from "../components/main/MainScreen";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";
import AuthRouter from "./AuthRouter";

const AppRouter = () => {

    const { checking, user } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch]);


    if( checking ) return <h1>Wait...</h1>;

    return (
        <Router>

            <div>

                    <Switch>

                        <PublicRoute 
                            path="/auth" 
                            isAuthenticated={ !!user }
                            component={ AuthRouter } 
                        />

                        <PrivateRoute 
                             exact
                             path="/" 
                             isAuthenticated={ !!user }
                             component={ MainScreen } 
                        />

                        <Redirect to="/auth/login" />

                    </Switch>

            </div>
            
        </Router>
    )
}

export default AppRouter
