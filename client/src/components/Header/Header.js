import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import SideNav from './SideNav/SideNav';

export default class Header extends Component {
  state = {
    toggleSideNav: false,
  };

  render() {
    return (
      <header>
        <div className="open_nav">
          <FontAwesome
            name="bars"
            onClick={() =>
              this.setState({ toggleSideNav: !this.state.toggleSideNav })
            }
            style={{
              color: '#ffffff',
              padding: '10px',
              cursor: 'pointer',
            }}
          />
        </div>
        <SideNav
          showNav={this.state.toggleSideNav}
          onHideNav={() =>
            this.setState({ toggleSideNav: !this.state.toggleSideNav })
          }
        />
        <Link to="/" className="logo">
          Bookaholic
        </Link>
      </header>
    );
  }
}
