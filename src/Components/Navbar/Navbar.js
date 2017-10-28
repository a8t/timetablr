import React, {Component} from "react";
import "./Navbar.css";
import Login from "./Login/Login"
import URLGenerator from "./URLGenerator/URLGenerator"
import { CSSTransitionGroup } from "react-transition-group"

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
            onClick={(e) => {
              e.target.blur()
              this.toggleLogin()
            }}
            className="login"
            href="#modal">Login / Sign Up
          </button>
          <CSSTransitionGroup
            transitionName="loginTransition"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={800}>
            {this.state.displayLogin
              ? <Login toggleLogin={this.toggleLogin} key="loginarea" />
              : <span key="span" />
            }
          </CSSTransitionGroup>
          <URLGenerator/>
        </nav>
      
        
        
        <div id="printview">
          <button 
            className="printbutton" 
            onClick={e => {
              window.print()
              e.target.blur()
          }}>
            Print Calendar
          </button>

          <button className="cozycomfy" onClick={e => {
            const setTo = this.state.comfy ? "55px" : "100px" 
            document.getElementById("calendars").style.setProperty("--colWidth", setTo)
            this.toggleComfy()
            e.target.blur()
          }}>
            View: {this.state.comfy ? "Comfy" : "Compact"}
          </button>
        </div>
        

      </div>
    )
  }
}

export default Navbar
