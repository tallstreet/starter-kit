/*global __DEV__*/
import Express from 'express';
import React from 'react';
import config from './config';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './ServerApiClient';
import routes from './routes';
import createLocation from 'history/lib/createLocation';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';

const app = new Express();
const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:' + config.apiPort
});

app.use(compression());
//app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));

let webpackStats;

if (!__DEV__) {
  webpackStats = require('../manifest.json');
}

app.use(require('serve-static')(path.join(__dirname, '..', 'dist')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res);
});

app.use((req, res) => {
  if (__DEV__) {
    webpackStats = require('../manifest.json');
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve('../manifest.json')];
  }
  const client = new ApiClient(req);
  const store = createStore(client);
  const location = createLocation(req.path);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps === null) {
      res.status(404).send('Not found');
    } else {
      try {
        res.send('<!doctype html>\n' + renderToString(
          <html lang="en-us">
          <head>
          <meta charSet="utf-8"/>
          <title>React Redux Universal Hot Example</title>
          <link rel="shortcut icon" href="/favicon.ico"/>
           {webpackStats.app.filter((file) => file.endsWith('css')).map((css, i) => <link href={css} ref={i} key={i}
                                               media="screen, projection" rel="stylesheet" type="text/css"/>)}
          </head>
          <body>
          <div id="content" className="outer" dangerouslySetInnerHTML={{__html: renderToString(<RoutingContext {...renderProps}/>)}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${JSON.stringify(store.getState())};`}}/>
          <script src={webpackStats.vendor}/>
          <script src={webpackStats.app[0]}/>
          </body>
          </html>));
      } catch (err) {
        console.error('ERROR', err);
        res.status(500).send({error: err});
      }
    }
  });
});

if (config.port) {
  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info('==> ✅  Server is listening');
      console.info('==> 🌎  %s running on port %s, API on port %s', config.app.name, config.port, config.apiPort);
    }
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
