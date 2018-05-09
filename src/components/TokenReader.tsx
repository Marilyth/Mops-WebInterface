import * as React from 'react';
import {Redirect} from 'react-router';
import {getToken} from './../utils/Authentification';


class TokenReader extends React.Component{
    public render(){
        getToken();
        return (
            <Redirect to='/'/>
        );
    }
}

export default TokenReader