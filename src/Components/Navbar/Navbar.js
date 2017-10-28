import React, {Component} from 'react';
import './Navbar.css';
import Login from './Login/Login.js'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayLogin: false,
      comfy: false
    }
    this.toggleLogin = this.toggleLogin.bind(this)
    this.toggleComfy = this.toggleComfy.bind(this)
  }

  toggleComfy() {
    this.setState({
      comfy: !this.state.comfy
    })
  }

  toggleLogin() {
    this.setState({
      displayLogin: !this.state.displayLogin
    })
  }

  render () {
    return (
      <div className="navbar" >
        <nav className="navBarLinks">
          <button
            onClick={() => this.toggleLogin()}
            className="login"
            href="#modal">Login / Sign Up
          </button>
          <button>
            Generate URL
          </button>
        </nav>
      

        {this.state.displayLogin
          ? <Login toggleLogin={this.toggleLogin} />
          : ""
        }
        <div id="printview">
          <button className="printbutton" onClick={(e) => window.print()}>
            Print Calendar
          </button>

          <button className="cozycomfy" onClick={() => {
            const setTo = this.state.comfy ? "55px" : "100px" 
            document.getElementById("calendars").style.setProperty("--colWidth", setTo)
            this.toggleComfy()
          }}>
            View: {this.state.comfy ? "Comfy" : "Compact"}
          </button>
        </div>
        

      </div>
    )
  }
}

export default Navbar
