import * as React from 'react';
import { Redirect } from 'react-router';

import { isLoggedIn, redirect } from './../utils/Authentification'

class AuthButton extends React.Component{
    
    
    public render(){
        if(isLoggedIn()){
            return <Redirect to='/'/>
        }

        return (
            <div className="redirect">
                <button className="discordButton" type="button" onClick={redirect}> Authentificate </button>
            </div>
        )
    }
}

export default AuthButton; 