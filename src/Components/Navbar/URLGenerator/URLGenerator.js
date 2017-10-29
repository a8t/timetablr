import React, {Component} from "react";
import "./URLGenerator.css"
import { CopyToClipboard } from "react-copy-to-clipboard";
import fire from "../../../fire"

export const Button = props => 
  <button className={props.className} onClick={e => {props.onClick(); e.target.blur()}}>{props.children}</button>

Button.defaultProps = {onClick: null, text: null, className: null}

class URLGenerator extends Component {

  constructor(props) {
    super(props)
    this.state = {
      generated: false,
      copied: false,
      url: ""
    }
    this.generateURL = this.generateURL.bind(this)
    this.toggleCopied = this.toggleCopied.bind(this)
  }

  generateURL() {
    const newTimetableRef = fire.database().ref('URLs').push(this.props.data)
    const timetableID = newTimetableRef.key

    this.setState({
      generated: true,
      url: timetableID
    })
  }

  toggleCopied() {
    this.setState({
      copied: !this.state.copied
    })
  }
  
  render() {
    // sorry about this
    return (
      <div id="URLGenerator">
        {!this.state.generated
          ? <Button onClick={this.generateURL}>Get URL</Button>
          : <CopyToClipboard text={`timetablr.ca/${this.state.url}`} onCopy={() => this.toggleCopied()}>
              {!this.state.copied 
                ? <Button>Copy to clipboard</Button>
                : <Button onClick={() => { this.generateURL(); this.toggleCopied() }}>Copied! Get new URL?</Button>
              }
            </CopyToClipboard>
        }

        {this.state.generated
          ? <div id="url">
              <a id="urltext" href={`http://timetablr.ca/${this.state.url}`}>{`timetablr.ca/${this.state.url}`}</a>
            </div>
          : <div id="url"></div>
        }
      </div>
    )
  }

}

export default URLGenerator;
