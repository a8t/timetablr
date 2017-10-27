import React, {Component} from 'react';
import './Navbar.css';
import Login from './Login/Login.js'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayLogin: false
    }
    this.toggleLogin = this.toggleLogin.bind(this)
  }

  toggleLogin() {
    this.setState({
      displayLogin: !this.state.displayLogin
    })
  }

  render () {
    return (
      <div
        className="navbar" >
        <nav className="navBarLinks">
          <button
            onClick={() => this.toggleLogin()}
            className="login"
            href="#modal">LOGIN / SIGNUP
          </button>
        </nav>

        {this.state.displayLogin
          ? <Login toggleLogin={this.toggleLogin} />
          : ""
        }
        
        <button
          className="printbutton"
          onClick={(e) => window.print()}
        >PRINT CALENDAR</button>
      </div>
    )
  }
}

export default Navbar
