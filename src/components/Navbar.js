import React, { Component } from 'react';
import Identicon from 'identicon.js';
import box from '../box.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="http://localhost:3000">
          <img src={box} width="30" height="30" className="d-inline-block align-top" alt="DataCoin" />
          DataCoin
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            {/*To create a new link just create a li, like About. You need to register the route at App.js*/}
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/file">File</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/transfer">Transfer</a>
            </li>
          </ul>
          <ul className="navbar-nav px-3">
            <li>
              <small id="account">
                <a target="_blank"
                   alt=""
                   className="text-white"
                   rel="noopener noreferrer"
                   href={"https://etherscan.io/address/" + this.props.account}>
                   Hello, {this.props.account.substring(0,6)}...{this.props.account.substring(38,42)} |
                  Your balance: {this.props.balance} DCN
                  { this.props.account
                    ? <img
                        alt=""
                        className='ml-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                      />
                    : <span></span>
                  }
                </a>
              </small>

            </li>
          </ul>
        </div>
      </nav>


    );
  }
}

export default Navbar;
