import * as React from 'react';
import { redirect } from './../utils/Authentification'

class AuthButton extends React.Component{
    
    
    public render(){
        return (
            <div className="redirect">
                <button className="discordButton" type="button" onClick={redirect}> Authentificate </button>
            </div>
        )
    }
}

export default AuthButton; 