import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div>
          <a
            className="zayidu"
            href="https://zayidu.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            © Developed by Zayidu
          </a>
        </div>
      </header>
    );
  }
}
