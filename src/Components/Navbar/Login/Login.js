import React, {Component} from 'react';
import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props)
    this.windowListen = e => { if (e.key === 'Escape') this.props.toggleLogin() }
  }
  

  componentWillMount(){
    window.addEventListener('keydown', this.windowListen)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.windowListen)
  }
  
  render() {
    return (
          
      <div 
        className='loginScreen' 
        onClick={() => this.props.toggleLogin()}
      >

        <div id="modal" className="modalContainer" onClick={(e) => e.stopPropagation()}>
        
          <button className="closeForm" onClick={() => this.props.toggleLogin()}>
            <svg>
                <line x1="0" y1="0" x2="12" y2="12" stroke="red" strokeWidth="4"/>
                <line x1="0" y1="12" x2="12" y2="0" stroke="red" strokeWidth="4"/>
            </svg>
          </button>

          <div className="popupForm">
            <input type="text" className="block form input" placeholder="email" required />
            <input type="password" className="block form input" placeholder="password" required />

            <div className="rememberMe">
              <input type="checkbox" className="form" id="remember"/>
              <label className="form" htmlFor="remember">Remember me on this computer</label>
            </div>
            <button className="block form" type="text" id="loginSubmit">Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
