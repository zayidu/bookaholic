import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/index';

export default function (ComposedClass, reload) {
  class AuthenticationCheck extends Component {
    state = {
      loading: false,
    };

    componentWillMount() {
      this.props.dispatch(auth());
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ loading: false });
      // Not Authenticated
      if (!nextProps.user.login.isAuth) {
        if (reload) {
          this.props.history.push('/login');
        }
        //   Authenticated
      } else {
        if (reload === false) {
          // only Route to /user if it from the route /login
          this.props.history.push('/user');
        }
      }
    }

    render() {
      if (this.state.loading) {
        return <div className="loader">Loading...</div>;
      }
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  const mapStateToProps = (state) => ({
    user: state.user,
  });
  return connect(mapStateToProps)(AuthenticationCheck);
}
