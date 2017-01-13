import {h} from 'preact';
import DragCore from './DragCore';
import Event from './Event';

function ResizeCore(props) {
  
  let style = {
    left: parseInt(props.x),
    top: parseInt(props.y),
    width: parseInt(props.width) + 'px',
    height: parseInt(props.height) + 'px',
    position: 'absolute',
    outline: '1px solid #95B6FF'
  }

  let resizeHandleStyle = {
    width: '5px',
    height: '5px',
    border: '1px solid #0079FF',
    backgroundColor: '#FEFEFF',
    position: 'absolute',
    zIndex: 1
  }

  let returnData = {
    width: parseInt(props.width),
    height: parseInt(props.height),
    x: props.x,
    y: props.y
  }

  let onResizeStart = (data) => {
  }

  let onResize = (data) => {
    typeof props.onResize == 'function' && props.onResize(data)
  }


  let onTopLeft = (data) => {
    handleTop(data);
    handleLeft(data);
    handleResize(data);

  }

  let onTopCenter = (data) => {
    handleTop(data);
    handleResize(data);
  }

  let onTopRight = (data) => {
    handleTop(data);
    handleRight(data);
    handleResize(data);
  }

  let onCenterRight = (data) => {
    handleRight(data);
    handleResize(data);
  }

  let onCenterLeft = (data) => {
    handleLeft(data)
    handleResize(data);
  }

  let onBottomLeft = (data) => {
    handleBottom(data);
    handleLeft(data);
    handleResize(data);
  }

  let onBottomCenter = (data) => {
    handleBottom(data)
    handleResize(data);
  }

  let onBottomRight = (data) => {
    handleBottom(data);
    handleRight(data);
    handleResize(data);
  }

  let onMove = (data) => {
    handleMove(data);
    typeof props.onMove == 'function' && props.onMove(data);
  }

  let onMouseDown = () => {
    typeof props.onMouseDown == 'function' && props.onMouseDown(props.id);
  }

  // Top Right Bottom Left Move handle
  let handleTop = (data) => {
      returnData.height = returnData.height - data.dy
      returnData.y = returnData.y + data.dy
  }
  let handleRight = (data) => {
      returnData.width = returnData.width + data.dx
  }
  let handleBottom = (data) => {
      returnData.height = returnData.height + data.dy
  }
  let handleLeft = (data) => {
      returnData.width = returnData.width - data.dx
      returnData.x = returnData.x + data.dx
  }

  let handleMove = (data) => {
    returnData.x = returnData.x + data.dx
    returnData.y = returnData.y + data.dy
  }

  let handleResize = (data) => {
    typeof props.onResize == 'function' && props.onResize(returnData);
  }

  let handleResizeStop = (data) => {
    typeof props.onResizeStop == 'function' && props.onResizeStop(returnData);
  }

  return (
    props.isSelected ?
      <div style={style}>
        <DragCore onDrag={onTopLeft} onDragStop={handleResizeStop}>
          <div style={{...resizeHandleStyle, ...{cursor: 'nwse-resize', top: '-3px', left: '-3px'}}}></div>
        </DragCore>
        <DragCore onDrag={onTopCenter} onDragStop={handleResizeStop}>
          <div style={{...resizeHandleStyle, ...{cursor: 'ns-resize', top: '-3px', left: '50%', marginLeft: '-3px'}}}></div>
        </DragCore>
        <DragCore onDrag={onTopRight} onDragStop={handleResizeStop}>
          <div style={{...resizeHandleStyle, ...{cursor: 'nesw-resize', top: '-3px', right: '-3px'}}}></div>
        </DragCore>
        <DragCore onDrag={onCenterLeft} onDragStop={handleResizeStop}>
          <div style={{...resizeHandleStyle, ...{cursor: 'ew-resize', top: '50%', marginTop: '-3px', left: '-3px'}}}></div>
        </DragCore>
        <DragCore onDrag={onCenterRight} onDragStop={handleResizeStop}>
          <div style={{...resizeHandleStyle, ...{cursor: 'ew-resize', top: '50%', marginTop: '-3px', right: '-3px'}}}></div>
        </DragCore>
        <DragCore onDrag={onBottomLeft} onDragStop={handleResizeStop}>
          <div style={{...resizeHandleStyle, ...{cursor: 'nesw-resize', bottom: '-3px', left: '-3px'}}}></div>
        </DragCore>
        <DragCore onDrag={onBottomCenter} onDragStop={handleResizeStop}>
          <div style={{...resizeHandleStyle, ...{cursor: 'ns-resize', bottom: '-3px', left: '50%', marginLeft: '-3px'}}}></div>
        </DragCore>
        <DragCore onDrag={onBottomRight} onDragStop={handleResizeStop}>
          <div style={{...resizeHandleStyle, ...{cursor: 'nwse-resize', bottom: '-3px', right: '-3px'}}}></div>
        </DragCore>
      </div>
    : null
  )
}

export default ResizeCore;