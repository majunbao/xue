import {h, render, Component, cloneElement} from 'preact';

class Header extends Component {

  render(props, state) {
    return (
      <div style={props.style} className={props.className}>
        <svg width="100%" height="100%">
          <rect height="25" width="25" fill="#242424" x="104" y="13" stroke="#fff" stroke-width="2" />
          <circle fill="#242424" stroke-width="2"  cx="200" cy="26" r="14" stroke="#ffffff"></circle>
        </svg>
      </div>
    )
  }
  
}

export default Header;
