import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AuthButton from './AuthButton';
import './css/stylesheet.css';
import TokenReader from './TokenReader';

const NoMatch = () => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)

interface IAppProps {
    loggedIn: boolean
}

function test() {
    return <div>TEST</div>;
}

class App extends React.Component<IAppProps, object>{
    public render() {
        if (!this.props.loggedIn && location.pathname !== '/Auth' &&  location.pathname !== '/redirect.html') {
            return <Redirect to='/Auth' />;
        }

        return (
            <div>
                <div className='topContainer'>
                    IconContainer
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