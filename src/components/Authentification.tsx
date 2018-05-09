import * as React from 'react';

// var APIENDPOINT = "https://discordapp.com/api/v6";
const CLIENT_ID = "305398845389406209";
// var CLIENT_SECRET = "bPQW1eyzOgD7NOwHWH0earXroK__rj_T";
const REDIRECT_URI = "http://5.45.104.29/Mops-WebInterface/redirect.html";
// var TokenInformation = {};
// var refreshFunction = "";

function redirect(){
    let redirectUri = REDIRECT_URI;
    if(typeof window !== 'undefined'){
        redirectUri = location.protocol + '//' + location.host + '/redirect'
    }

    window.location.replace(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=guilds%20identify&response_type=code&redirect_uri=${redirectUri}`);
}


class Auth extends React.Component{
    
    
    public render(){
        return (
            <div className="redirect">
                <button className="discordButton" type="button" onClick={redirect}> Authentificate </button>
            </div>
        )
    }
}

export default Auth;