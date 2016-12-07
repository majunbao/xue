import React from 'react';

class Button extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      class: `button
        ${this.props.primary ? 'button-blue' : ''}
        ${this.props.success ? 'button-green' : ''}
        ${this.props.sm ? 'button-small' : ''}
      `.replace(/\s+/g, ' ') // replace 优化代码格式
    }
  }

  componentDidMount() {
    
  }

  render() {
    return <button className={this.state.class}>{this.props.children}</button>
  }
}

export default Button;