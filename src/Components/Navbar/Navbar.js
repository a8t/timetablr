import React, {Component} from "react";
import "./Navbar.css";
import URLGenerator, { Button } from "./URLGenerator/URLGenerator"
// import Login from "./Login/Login"
// import { CSSTransitionGroup } from "react-transition-group"

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
    const setTo = this.state.comfy ? "55px" : "100px"
    document.getElementById("calendars").style.setProperty("--colWidth", setTo)

    this.setState({comfy: !this.state.comfy})
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
          <URLGenerator data={this.props.data}/>
        </nav>
      
        <div id="printview">
          <Button className="printbutton" onClick={() => window.print()}>Print Calendar</Button>

          <Button className="cozycomfy" onClick={this.toggleComfy}>
            View: {this.state.comfy ? "Comfy" : "Compact"}
          </Button>
        </div>
      </div>
    )
  }
}

export default Navbar

// <button
// onClick = {(e) => {
//   e.target.blur()
//   this.toggleLogin()
// }}
// className = "login"
// href = "#modal" > Login / Sign Up
//           </button >

          
          // <CSSTransitionGroup
          //   transitionName="loginTransition"
          //   transitionEnterTimeout={800}
          //   transitionLeaveTimeout={800}>
          //   {this.state.displayLogin
          //     ? <Login toggleLogin={this.toggleLogin} key="loginarea" />
          //     : <span key="span" />
          //   }
          // </CSSTransitionGroup>