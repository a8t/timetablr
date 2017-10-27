import React, {Component} from 'react';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayLogin: false
    }
  }

  toggleLogin() {
    this.setState({
      displayLogin: !this.state.displayLogin
    })
  }

  render() {
  return (
    <div className='loginContainer'>
      <button
        onClick={() => this.toggleLogin()}
        className="login"
        href="#modal">LOGIN / SIGNUP</button>

      <div id="modal"
        className="modalContainer"
        style={{ display: this.state.displayLogin ? 'block' : 'none', overflow: 'auto'}}>

        <div className="popupContainer">
          <button class="closeForm"
            onClick={() =>  this.toggleLogin()}>x</button>

          <header className="popupHeader">Login</header>

          <div className="popupForm">
            <label className="label form">Email/Username</label>
            <input type="text" className="block form input" required />
            <label className="label form">Password</label>
            <input type="password" className="block form input" required />
            <input type="checkbox" className="form" id="remember"/>
            <label className="label form rememberMe" for="remember">Remember me on this computer</label>
            <button className="block form submit" type="text">SUBMIT</button>
            <button className="form register" type="text">REGISTER</button>
          </div>
        </div>

      </div>
    </div>
  )}
}

export default Login
