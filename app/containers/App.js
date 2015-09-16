import {Provider} from 'react-redux';
import React from 'react';
import configureStore from '../redux/create';
import Routes from '../routes';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {renderDevTools} from '../utils/devTools';

const store = configureStore();

export default (props) => {
  return <div className="outer">
    {/* <Home /> is your app entry point */}
    <Provider store={store}>
      
      <Router history={createBrowserHistory()}>
        <Routes />
      </Router>
    </Provider>

    <div style={{"display": "none"}}>
      {/* only renders when running in DEV mode */
        renderDevTools(store)
      }
    </div>
  </div>;
};
