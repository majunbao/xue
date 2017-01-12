import {h, cloneElement} from 'preact';
import {addEvent, removeEvent} from './Dom';
import {Event} from './Event';

function DragCore(props) {
  let x = 0;
  let y = 0;
  let mx = 0;
  let my = 0;
  let dx = 0;
  let dy = 0;
  let darging = false;

  let data = {
    x: null,
    y: null,
    mx: null,
    my: null,
    dx: null,
    dy: null,
    event: null,
    node: null
  };

  let returnData = (e) => {
    return {
      x: e.pageX,
      y: e.pageY,
      mx: mx,
      my: my,
      dx: dx,
      dy: dy,
      event: e,
      node: e.target
    }
  }

  let handleDragStart = (e) => {
    const ownerDocument = document;
    
    x = e.pageX - mx;
    y = e.pageY - my;

    typeof props.onDragStart == 'function' && props.onDragStart(returnData(e));

    addEvent(ownerDocument, 'mousemove', handleDrag);
    addEvent(ownerDocument, 'mouseup', handleDragStop);
  };

  let handleDragStop = (e) => {
    const ownerDocument = document;

    typeof props.onDragStop == 'function' && props.onDragStop(returnData(e));
    
    removeEvent(ownerDocument, 'mousemove', handleDrag);
    removeEvent(ownerDocument, 'mouseup', handleDragStop);

  };

  let handleDrag = (e) => {
    dx = mx;
    dy = my;
    mx = e.pageX - x;
    my = e.pageY - y;
    dx = mx - dx;
    dy = my - dy;
    typeof props.onDrag == 'function' && props.onDrag(returnData(e));
  };

  let onDragStart = (e) => {
    e.which == 1 && handleDragStart(e)
  }

  return (
    cloneElement(props.children[0], {
      onMouseDown: onDragStart
    })
  )
}

export default DragCore;