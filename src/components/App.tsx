import * as React from 'react';
import { Route, Switch } from 'react-router';

// import {isLoggedIn} from './../utils/Authentification'
import Guilds from './Guilds'
import Login from './Login';
// import AuthButton from './AuthButton';
import TokenReader from './TokenReader';

import './css/stylesheet.css';

const NoMatch = () => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)



function test() {
    return <div>TEST</div>;
}

function about() {
    return <div>About</div>;
}

function serverList(){
    return <div className = 'centralContainer'>
                <table id='containerTable'>
                    <tr>
                        <td>
                            <div id='serverList' className='scroll-content serverList'>
                                <Guilds/>
                            </div>
                        </td>
                        <td>
                            <div id="iconList" className='iconList'> bla </div>
                        </td>
                    </tr>
                    </table>
           </div>
}

class App extends React.Component {
    public render() {
        return (
            <div>
                <div className='topContainer'>
                    <Login />
                </div>
                

                <Switch>
                    <Route exact={true} path='/' render={test} />
                    <Route path='/Redirect' component={TokenReader} />
                    <Route path='/About' component={about} />
                    <Route patch='/Guilds' component={serverList} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}

export default App;