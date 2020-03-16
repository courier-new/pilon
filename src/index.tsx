import './index.css';

import * as serviceWorker from './serviceWorker';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));

// Enable offline support: https://bit.ly/CRA-PWA
serviceWorker.register();
