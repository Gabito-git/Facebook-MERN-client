const { Route, Redirect } = require("react-router")

const PrivateRoute = ({

    component: Component,
    isAuthenticated,
    ...rest

}) => {
    return (
        <Route
            {...rest}
            component={ props => (
                isAuthenticated 
                    ? <Component {...props} />
                    : <Redirect to="/auth/login" />
            ) }
        
        />           
        
    )
}

export default PrivateRoute
