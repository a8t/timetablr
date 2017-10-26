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

          <div></div>

          <div className="popupForm">
            <input type="text" className="block form input" placeholder="email" required />
            <input type="password" className="block form input" placeholder="password" required />

            <div className="rememberMe">
              <input type="checkbox" className="form" />
              <label className="form">Remember me on this computer</label>
            </div>

            <button className="block form" type="text">SUBMIT</button>
          </div>
        </div>

      </div>
    </div>
  )}
}

export default Login
