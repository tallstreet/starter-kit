import React from 'react';
import {Route} from 'react-router';
import App from './components/Application';
import Home from './components/Home';
import NotFound from './components/NotFound';

export default (
  <Route component={App}>
    <Route path="/" component={Home}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
