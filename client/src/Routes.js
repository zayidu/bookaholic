import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Layout from './hoc/Layout';
import BookView from './components/Books/BookView';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/books/:id" exact component={BookView} />
      </Switch>
    </Layout>
  );
};

export default Routes;
