import React from 'react';


class Tool extends React.Component {
  render() {
    return(
      <div className="toolbar-item">
        <button>xxx</button>
        <span>{this.props.children}</span>
      </div>
    )
  }
}

export default Tool;