import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Redirect from './components/Authentification';

import './components/css/stylesheet.css';

ReactDOM.render(
    <Redirect />,
    document.getElementById('root') as HTMLElement  
);