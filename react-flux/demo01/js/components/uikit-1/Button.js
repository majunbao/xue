import React from 'react';

class Button extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      class: 'button'
    }
  }

  render() {
    let className = `button
      ${this.props.primary ? 'button-blue' : ''}
      ${this.props.success ? 'button-green' : ''}
    `.replace(/\s+/g, ' '); // replace 优化代码格式

    return <button className={className}>{this.props.children}</button>
  }
}

export default Button;