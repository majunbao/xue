import React from 'react';

class Select extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hidden: false
    };
  }

  onSelect = () => {
    this.setState({
      hidden: !this.state.hidden
    })
  }

  render() {
    return (
      <div className="select">
        <a className="select-box" onClick={this.onSelect}>缩放</a>
        {this.state.hidden ? <Options /> : null}
      </div>
    )
  }
}

class Options extends React.Component {
  render() {
    return (
      <ul className="select-option">
        <li>200%</li>
        <li>150%</li>
        <li>100%</li>
        <li>75%</li>
        <li>50%</li>
        <li>25%</li>
      </ul>
    )
  }
}

export default Select;