import React from 'react';
import {Router, Route} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Layout from './components/Layout';
import Home from './components/Home';
import NotFound from './components/NotFound';

export default (props) => {
  return (
    <Router history={createBrowserHistory()}>
      <Route component={Layout}>
        <Route path="/" component={Home}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  );
};
