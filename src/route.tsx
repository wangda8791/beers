import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { BeerDetailView, BeerListView } from './views';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/beers">
          <BeerListView />
        </Route>
        <Route path="/beer/:id">
          <BeerDetailView />
        </Route>
        <Redirect path="/" to="/beers" />
      </Switch>
    </Router>
  );
};

export default Routes;
