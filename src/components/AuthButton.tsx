import * as React from 'react';
import { Redirect } from 'react-router';

import { isLoggedIn, redirect } from './../utils/Authentification'


class AuthButton extends React.Component{
    
    
    public render(){
        if(isLoggedIn()){
            return <Redirect to='/'/>
        }

        return (
            <button className="discordButton rightAlign" type="button" onClick={redirect}> Authentificate </button>
        )
    }
}

export default AuthButton; 