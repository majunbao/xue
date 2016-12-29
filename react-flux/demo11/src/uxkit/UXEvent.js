import {h, render, Component, cloneElement} from 'preact';
import {addEvent, removeEvent} from './UXDom';

class UXEvent extends Component {

  x = 0;
  y = 0;
  dx = 0;
  dy = 0;
  darging = false;


  handleDragStart = (e) => {
    const ownerDocument = document;
    
    this.x = e.pageX - this.dx;
    this.y = e.pageY - this.dy;

    addEvent(ownerDocument, 'mousemove', this.handleDrag);
    addEvent(ownerDocument, 'mouseup', this.handleDragStop);
  };

  handleDragStop = (e) => {
    const ownerDocument = document;
    removeEvent(ownerDocument, 'mousemove', this.handleDrag);
  };

  handleDrag = (e) => {
    this.dx = e.pageX - this.x;
    this.dy = e.pageY - this.y;
    this.props.onDrag({
      x: e.pageX,
      y: e.pageY,
      dx: this.dx,
      dy: this.dy,
      event: e,
      node: this.base
    })
  };

  onMouseDown = (e) => {
    typeof this.props.onMouseDown == 'function' && this.props.onMouseDown(e);
    e.which == 1 && typeof this.props.onDrag == 'function' && this.handleDragStart(e);
  };

  render(props, state) {
    return cloneElement(props.children[0],{
      onClick: this.props.onClick,
      onMouseDown: this.onMouseDown,
      onMouseMove: this.props.onMouseMove,
      onMouseUp: this.props.onMouseUp
    });
  };
}

export default UXEvent;