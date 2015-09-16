import Layout from './components/Layout';
import Home from './components/Home';
import NotFound from './components/NotFound';

const HomeRoute = {
  path: '/',
  component: Home
};

const NotFoundRoute = {
  path: '*',
  component: NotFound
};

export default {
  path: '/',
  component: Layout,
  childRoutes: [ HomeRoute, NotFoundRoute ]
};
