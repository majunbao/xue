import {h, render, Component, cloneElement} from 'preact';
import CanvasAction from '../actions/CanvasActions';

class Header extends Component {

  render(props, state) {
    return (
      <div style={props.style} className={props.className}>
      </div>
    )
  }
  
}

export default Header;
