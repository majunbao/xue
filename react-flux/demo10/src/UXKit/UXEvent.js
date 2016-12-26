import {h, render, Component, cloneElement} from 'preact';
import {addEvent, removeEvent} from './UXDom';

class UXEvent extends Component {
  state = {
    color: 'red',
    transform: "translate(20px, 20px)"
  }

  handleDragStart = (e) => {
    const ownerDocument = document;



    addEvent(ownerDocument, 'mousemove', this.handleDrag);
    addEvent(ownerDocument, 'mouseup', () => {
      removeEvent(ownerDocument, 'mousemove', this.handleDrag);
    });
  }

  handleDragStop = (e) => {
    const ownerDocument = document;
  }

  handleDrag = (e) => {
    console.log(this)
    console.log(e.pageX);
    
  }

  onMouseDown = (e) => {
    this.setState({
      color: 'yellow'
    })
    this.handleDragStart()
  }

  onMouseUp = () => {
    this.handleDragStop();
  }

  onMouseMove = () => {

  }

  render(props, state) {
    return cloneElement(props.children[0],{
      onClick: this.props.click,
      onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp,
      style: state
    });
  }
}

export default UXEvent;