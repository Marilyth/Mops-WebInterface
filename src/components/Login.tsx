import * as React from 'react';

import AuthButton from './AuthButton';



class Login extends React.Component{
    private show = false;
    private ref: React.RefObject<HTMLDivElement>;
    constructor(props: {}){
        super(props)
        this.ref = React.createRef<HTMLDivElement>();
    }


    public render(){
        const user = sessionStorage.getItem('user');
        if(user===null){
            return <AuthButton/>
        }
        const userInformation = JSON.parse(user);
        
        
        const image  = `https://cdn.discordapp.com/avatars/${userInformation.id}/${userInformation.avatar}.webp`;
        
        return (
            <div ref={this.ref}>
            {
            }
                <img className="roundSquare rightAlign userIcon" src={image} onClick={this.toggleDropdown}/>
                {   this.show &&
                    <div className="dropdown-content rightAlign">
                        <a>SettingA</a>
                        <a>SettingB</a>
                    </div>
                }
            </div>)
    }

    public toggleDropdown = () =>{
        this.show=this.show?false:true;
        // tslint:disable-next-line:no-console
        console.log(`switched from ${!this.show} to ${this.show}`)
        this.forceUpdate()
    }

    public componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false)
    } 
    public componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    public handleClick = (e : MouseEvent) =>{
        
        
        if(this.ref!= null && this.ref.current!=null  && e.currentTarget!=null && e.currentTarget instanceof HTMLDocument){
            if(this.ref.current.contains(e.currentTarget)){
                return;
                
            }
            // tslint:disable-next-line:no-console
            console.log(this.show)
            this.show=false;
            this.forceUpdate()
        }

    }
}

export default Login;