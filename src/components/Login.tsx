import * as React from 'react';

import AuthButton from './AuthButton';



class Login extends React.Component{
private show = false;

    public render(){
        const user = sessionStorage.getItem('user');
        if(user===null){
            return <AuthButton/>
        }
        const userInformation = JSON.parse(user);
        
        
        const image  = `https://cdn.discordapp.com/avatars/${userInformation.id}/${userInformation.avatar}.webp`;
        
        return (
            <div>
                <img className="roundSquare rightAlign userIcon" src={image} onClick={
                    // tslint:disable-next-line:jsx-no-lambda
                    () =>{this.show=this.show?false:true;
                    this.forceUpdate()}
                }   />
                {   this.show &&
                    <div className="dropdown-content rightAlign">
                        <a>SettingA</a>
                        <a>SettingB</a>
                    </div>
                }
            </div>)
    }
}

export default Login;