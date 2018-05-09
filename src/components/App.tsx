import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import {isLoggedIn} from './../utils/Authentification'
import AuthButton from './AuthButton';
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

class App extends React.Component{
    public render() {
        if (!isLoggedIn() && location.pathname !== '/Auth' &&  location.pathname !== '/redirect.html') {
            return <Redirect to='/Auth' />;
        }

        return (
            <div>
                <div className='topContainer'>
                    topContainer
                </div>

                <Switch>
                    <Route exact={true} path='/' render={test} />
                    <Route path='/redirect.html' component={TokenReader} />
                    <Route path='/Auth' component={AuthButton} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}

export default App;