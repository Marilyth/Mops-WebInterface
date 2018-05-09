import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import App from './components/App'

import './components/css/stylesheet.css';

ReactDOM.render(
    <BrowserRouter>
        <App loggedIn={false}/>
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement  
);