import React from 'react';

class Scroll extends React.Component {
  render() {
    return(
      <div className="scroll-container">
        <ScrollView />
        <ScrollX />
        <ScrollY />
      </div>
    )
  }
}

class ScrollView extends React.Component {
  render() {
    return(
      <div className="scroll-view">
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
        <p>你好</p>
      </div>
    )
  }
}

class ScrollX extends React.Component {
  render() {
    return(
      <div className="scroll-x">
        <span></span>
      </div>
    )
  }
}

class ScrollY extends React.Component {
  render() {
    return(
      <div className="scroll-y">
        <span></span>
      </div>
    )
  }
}

export default Scroll;