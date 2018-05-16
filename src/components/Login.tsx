import * as React from 'react';

import AuthButton from './AuthButton';



class Login extends React.Component{
    public render(){
        const user = sessionStorage.getItem('user');
        if(user===null){
            return <AuthButton/>
        }
        const userInformation = JSON.parse(user);
        
        
        const image  = `https://cdn.discordapp.com/avatars/${userInformation.id}/${userInformation.avatar}.webp`;
        
        return (<div>
                    <img className="roundSquare rightAlign userIcon" src={image} />
                </div>)
    }
}

export default Login;