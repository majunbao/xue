import React from 'react';

class Text extends React.Component {
  render() {
    return (
      <span>{this.props.children}</span>
    )
  }
}

export default Text;