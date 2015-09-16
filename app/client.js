/* global __DEVTOOLS__ */

// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
require('./index.scss');
import 'babel/polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('main'));
