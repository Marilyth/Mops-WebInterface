import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Auth from './Authentification';

const NoMatch = (   ) => (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
  )
  
interface IAppProps{
    loggedIn: boolean
}

function test(){
    return <div>TEST</div>;
}

class App extends React.Component<IAppProps, object>{
    public render(){
        if (!this.props.loggedIn && location.pathname!=='/Auth')
            {
                return <Redirect to='/Auth' />;
            }
        
        return( 
            <Switch>
                <Route exact={true} path='/' render={test }/>
                <Route path='/Auth' component={Auth}/>
                <Route component={NoMatch} />
            </Switch>
        );
    }
}

export default App;