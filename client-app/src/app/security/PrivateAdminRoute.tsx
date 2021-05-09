import React from 'react'
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';
import { useStore } from '../stores/Store';


interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}


const PrivateAdminRoute = ({component: Component, ...rest}: Props) => {
    const {commonStore: {isRoles}, userStore: {isLoggedIn}} = useStore();
    return (
        <Route 
            {...rest}
            render={(props) => isRoles(["Operator"]) && isLoggedIn ? <Component {...props} /> : <Redirect to='/RestrictedAccess' />}
        />
    )
}

export default PrivateAdminRoute
