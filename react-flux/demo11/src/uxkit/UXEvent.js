import {h, render, Component, cloneElement} from 'preact';
import {addEvent, removeEvent} from './UXDom';

class UXEvent extends Component {
  x = 0;
  y = 0;
  mx = 0;
  my = 0;
  dx = 0;
  dy = 0;
  darging = false;


  handleDragStart = (e) => {
    const ownerDocument = document;
    
    this.x = e.pageX - this.mx;
    this.y = e.pageY - this.my;

    typeof this.props.onMoveStart == 'function' && this.props.onMoveStart({
      x: e.pageX,
      y: e.pageY,
      mx: this.mx,
      my: this.my,
      dx: this.dx,
      dy: this.dy,
      event: e,
      node: this.base
    });

    addEvent(ownerDocument, 'mousemove', this.handleDrag);
    addEvent(ownerDocument, 'mouseup', this.handleDragStop);
  };

  handleDragStop = (e) => {
    const ownerDocument = document;

    typeof this.props.onDragStop == 'function' && this.props.onDragStop({
      x: e.pageX,
      y: e.pageY,
      mx: this.mx,
      my: this.my,
      dx: this.dx,
      dy: this.dy,
      event: e,
      node: this.base
    });
    
    removeEvent(ownerDocument, 'mousemove', this.handleDrag);
    removeEvent(ownerDocument, 'mouseup', this.handleDragStop);

  };

  handleDrag = (e) => {
    this.dx = this.mx;
    this.dy = this.my;
    this.mx = e.pageX - this.x;
    this.my = e.pageY - this.y;
    this.dx = this.mx - this.dx;
    this.dy = this.my - this.dy;
    this.props.onDrag({
      x: e.pageX,
      y: e.pageY,
      mx: this.mx,
      my: this.my,
      dx: this.dx,
      dy: this.dy,
      event: e,
      node: this.base
    });
  };

  onMouseDown = (e) => {
    typeof this.props.onMouseDown == 'function' && this.props.onMouseDown(e);
    e.which == 1 && typeof this.props.onDrag == 'function' && this.handleDragStart(e);
  };

  render(props, state) {
    let childrenStyle = typeof props.children[0].attributes == 'object' ? props.children[0].attributes.style : {}
    return cloneElement(props.children[0],{
      onClick: this.props.onClick,
      onMouseDown: this.onMouseDown,
      onMouseMove: this.props.onMouseMove,
      onMouseUp: this.props.onMouseUp,
      style: childrenStyle
    });
  };
}

export default UXEvent;