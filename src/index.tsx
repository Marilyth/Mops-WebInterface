import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import App from './components/App'

import {isLoggedIn} from './utils/Authentification'

ReactDOM.render(
    <BrowserRouter>
        <App loggedIn={isLoggedIn()}/>
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement  
);