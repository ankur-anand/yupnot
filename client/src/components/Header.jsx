import React, { Component } from 'react';
/* eslint-disable class-methods-use-this */
class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            SendMaily
          </a>
          <ul id="nav-mobile" className="right">
            <li>
              <a href="/auth/google">Login With Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
