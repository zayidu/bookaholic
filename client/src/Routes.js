import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Layout from './hoc/Layout';
import BookView from './components/Books/BookView';
import Login from './containers/Admin/Login';
import AddBookReview from './containers/Admin/AddBookReview';
import EditBookReview from './containers/Admin/EditBookReview';
import UserPosts from './components/Admin/UserPosts';
import Auth from './hoc/Auth';
import User from './components/Admin/User';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        {/* Public Route */}
        <Route path="/" exact component={Auth(Home, null)} />
        {/* Public Route but Shouldn't come up for Logged In Users */}
        <Route path="/login" exact component={Auth(Login, false)} />
        {/* Private Route */}
        <Route path="/user" exact component={Auth(User, true)} />
        {/* Private Route */}
        <Route path="/user/add" exact component={Auth(AddBookReview, true)} />
        {/* Private Route */}
        <Route
          path="/user/edit-post/:id"
          exact
          component={Auth(EditBookReview, true)}
        />
        {/* Private Route */}
        <Route
          path="/user/user-reviews"
          exact
          component={Auth(UserPosts, true)}
        />
        {/* Public Route */}
        <Route path="/books/:id" exact component={Auth(BookView, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
