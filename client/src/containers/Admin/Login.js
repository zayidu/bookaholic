import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/index';

class Login extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // };

  state = {
    email: '',
    password: '',
    error: '',
    success: false,
  };

  handleInputEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  handleInputPassword = (event) => {
    this.setState({ password: event.target.value });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.login.isAuth) {
      this.props.history.push('/user');
    }
  }
  submitForm = (e) => {
    // console.log(this.state);

    e.preventDefault();
    this.props.dispatch(loginUser(this.state));
  };

  render() {
    let user = this.props.user;

    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Log in here</h2>

          <div className="form_element">
            <input
              type="email"
              placeholder="Enter your mail"
              value={this.state.email}
              onChange={this.handleInputEmail}
            />
          </div>

          <div className="form_element">
            <input
              type="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleInputPassword}
            />
          </div>

          <button type="submit">Log in</button>

          <div className="error">
            {user.login ? <div>{user.login.message}</div> : null}
          </div>
        </form>
        <div>
          <button
            className="registerButton"
            type="submit"
            onClick={() => {
              window.location.href =
                'mailto:zayidu11@gmail.com?subject=Bookaholic Register User&body=Register%20Me';
            }}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Login);
