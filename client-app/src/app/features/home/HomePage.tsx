import React, { useEffect } from 'react'
import { observer } from "mobx-react-lite";
import LoginPage from '../auth/LoginPage';
import { useStore } from '../../stores/Store';
import { history } from './../../../index';

const HomePage = () => {
    const {userStore: {isLoggedIn}, commonStore: {isRoles}} = useStore();

    // const loginVals = {
    //     email: 'Oskar.Dobler@test.com',
    //     password: 'Pa$$w0rd',
    // }

    // const LoginTest = async () => {
    //     try {
    //         await login(loginVals);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        isLoggedIn && isRoles(["Admin"]) && history.push('/admin');
        isLoggedIn && isRoles(["Member"]) && history.push('/user');
        isLoggedIn && isRoles(["Operator"]) && history.push('/operator');
    })

    return (
        
        <LoginPage/>
      
        
    )
}

export default observer(HomePage)
