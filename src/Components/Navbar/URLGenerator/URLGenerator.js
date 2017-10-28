import React, {Component} from 'react';
import './URLGenerator.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';

class URLGenerator extends Component {

  constructor(props) {
    super(props)
    this.state = {
      generated: false,
      copied: false,
      url: ""
    }
    this.toggleGenerateCopy = this.toggleGenerateCopy.bind(this)
    this.toggleCopied = this.toggleCopied.bind(this)
  }

  toggleGenerateCopy(){
    this.setState(prevstate => {
      const newURL = `timetablr.ca/${Math.random().toString(36).substr(2, 10)}`


      return {
        generated: true,
        url: newURL
      }
    })
  }

  toggleCopied(){
    this.setState({
      copied: !this.state.copied
    })
  }

  
  render() {
    return (
      <div id="URLGenerator">
        {!this.state.generated
            ? <button onClick={() => this.toggleGenerateCopy()}>Get URL</button>
            : <CopyToClipboard text={this.state.url}
                onCopy={() => this.toggleCopied()}>
                {!this.state.copied 
                  ? <button>Copy to clipboard</button>
                  : <button onClick={() => {this.toggleGenerateCopy(); this.toggleCopied()}}>Copied! Get new URL?</button>
                }
              </CopyToClipboard>
        }
        

        
        <div id="url">
          {this.state.url}
        </div>
      </div>
    )
  }

}

export default URLGenerator;
