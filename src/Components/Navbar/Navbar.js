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
      comfy: 1
    }
    this.comfy = ["Compact", "Cozy", "Comfy"]
    this.toggleLogin = this.toggleLogin.bind(this)
    this.toggleComfy = this.toggleComfy.bind(this)
  }

  toggleComfy() {
    this.setState( prevState => {
      const newIndex = (prevState.comfy + 1) % 3

      let setTo 

      switch (newIndex) {
        case 0:
          document.getElementById("App").style.setProperty("--colWidth", "36px")
          document.getElementById("App").style.setProperty("--titleSize", "80%")
          document.getElementById("App").style.setProperty("--sidebarWidth", "200px")
          document.getElementById("App").style.setProperty("--shortListFontSize", "12px")
          break
        case 1:
          document.getElementById("App").style.setProperty("--colWidth", "55px")
          document.getElementById("App").style.setProperty("--titleSize", "80%")
          document.getElementById("App").style.setProperty("--sidebarWidth", "300px")
          document.getElementById("App").style.setProperty("--shortListFontSize", "14px")
          
          break
        case 2:
          document.getElementById("App").style.setProperty("--colWidth", "100px")
          document.getElementById("App").style.setProperty("--titleSize", "100%")
          document.getElementById("App").style.setProperty("--sidebarWidth", "300px")
          document.getElementById("App").style.setProperty("--shortListFontSize", "14px")
          
          break;
      }

      return { comfy: newIndex }
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
          <URLGenerator data={this.props.data}/>
        </nav>
      
        <div id="printview">
          <Button className="printbutton" onClick={() => window.print()}>Print Calendar</Button>

          <Button className="cozycomfy" onClick={this.toggleComfy}>
            View: {this.comfy[this.state.comfy]}
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