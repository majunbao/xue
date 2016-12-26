import {h, render, Component, cloneElement} from 'preact';
import {addEvent, removeEvent} from './UXDom';

class UXEvent extends Component {
  state = {
    transform: "translate(0px, 0px)",
  }

  style = {
    fontSize: "20px",
    color: "red"
  }

  x = 0;
  y = 0;
  dx = 0;
  dy = 0;


  handleDragStart = (e) => {
    const ownerDocument = document;
    
    this.x = e.pageX - this.dx;
    this.y = e.pageY - this.dy;

    addEvent(ownerDocument, 'mousemove', this.handleDrag);
    addEvent(ownerDocument, 'mouseup', () => {
      removeEvent(ownerDocument, 'mousemove', this.handleDrag);
      this.handleDragStop();
    });
  }

  handleDragStop = (e) => {
    const ownerDocument = document;
  }

  handleDrag = (e) => {
    this.dx = e.pageX - this.x;
    this.dy = e.pageY - this.y;
    this.setState({
      transform: `translate(${this.dx}px, ${this.dy}px)`
    });
  }

  onMouseDown = (e) => {
    this.props.onMouseDown && this.props.onMouseDown(e);
    this.handleDragStart(e);
  }

  onMouseUp = () => {
    
  }

  onMouseMove = () => {

  }

  render(props, state) {
    return cloneElement(props.children[0],{
      onClick: this.props.click,
      onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp,
      style: {...this.style, ...state}
    });
  }
}

export default UXEvent;