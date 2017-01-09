import {h, render, Component, cloneElement} from 'preact';
import UXEvent from './UXEvent';

class UXResize extends Component {
  state = {
    width: this.props.width,
    height: this.props.height,
    left: this.props.x,
    right: 0,
    botton: 0,
    top: this.props.y,
    cursor: 'default'
  }
  resizeStyle = {
    position: 'absolute',
    width: this.state.width,
    height: this.state.height,
    border: '1px solid #95B6FF'
  }
  resizeHandleStyle = {
    width: '9px',
    height: '9px',
    border: '1px solid #FEFEFF',
    backgroundColor: '#0079FF',
    borderRadius: '5px',
    position: 'absolute'
  }

  onTopLeft = (data) => {
    this.handleTop(data);
    this.handleLeft(data);
    this.handleResize(data);
  }

  onTopCenter = (data) => {
    this.handleTop(data);
    this.handleResize(data);
  }

  onTopRight = (data) => {
    this.handleTop(data);
    this.handleRight(data);
    this.handleResize(data);
  }

  onCenterRight = (data) => {
    this.handleRight(data);
    this.handleResize(data);
  }

  onCenterLeft = (data) => {
    this.handleLeft(data)
    this.handleResize(data);
  }

  onBottomLeft = (data) => {
    this.handleBottom(data);
    this.handleLeft(data);
    this.handleResize(data);
  }

  onBottomCenter = (data) => {
    this.handleBottom(data)
    this.handleResize(data);
  }

  onBottomRight = (data) => {
    this.handleBottom(data);
    this.handleRight(data);
    this.handleResize(data);
  }

  onMove = (data) => {
    this.handleMove(data);
    typeof this.props.onMove == 'function' && this.props.onMove(data);
  }

  // Top Right Bottom Left Move handle
  handleTop = (data) => {
    this.setState({
      height: parseInt(this.state.height) - data.dy,
      top: parseInt(this.state.top) + data.dy
    });
  }
  handleRight = (data) => {
    this.setState({
      width: parseInt(this.state.width) + data.dx,
    });
  }
  handleBottom = (data) => {
    this.setState({
      height: parseInt(this.state.height) + data.dy
    });
  }
  handleLeft = (data) => {
    this.setState({
      width: parseInt(this.state.width) - data.dx,
      left: parseInt(this.state.left) + data.dx,
    });
  }

  handleMove = (data) => {
    this.setState({
      left: parseInt(this.state.left) + data.dx,
      top: parseInt(this.state.top) + data.dy
    });
  }

  handleResize = (data) => {
    typeof this.props.onResize == 'function' && this.props.onResize({...data, w: this.state.width, h: this.state.height});
  }

  handleResizeStop = (data) => {
    typeof this.props.onResizeStop == 'function' && this.props.onResizeStop({...data, w: this.state.width, h: this.state.height});
  }

  render(props, state) {
    return (
      <div style={{...this.resizeStyle, ...{width: state.width, height: state.height, left: state.left, top: state.top}}}>
        <UXEvent onDrag={this.onTopLeft} onDragStop={this.handleResizeStop}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'nwse-resize', top: '-6px', left: '-6px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onTopCenter}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'ns-resize', top: '-6px', left: '50%', marginLeft: '-6px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onTopRight}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'nesw-resize', top: '-6px', right: '-6px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onCenterLeft}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'ew-resize', top: '50%', marginTop: '-6px', left: '-6px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onCenterRight}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'ew-resize', top: '50%', marginTop: '-6px', right: '-6px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onBottomLeft}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'nesw-resize', bottom: '-6px', left: '-6px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onBottomCenter}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'ns-resize', bottom: '-6px', left: '50%', marginLeft: '-6px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onBottomRight} onDragStop={props.onResizeStop}  >
          <div style={{...this.resizeHandleStyle, ...{cursor: 'nwse-resize', bottom: '-6px', right: '-6px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onMove}>
          {props.children}
        </UXEvent>
      </div>
    )
  }
}

export default UXResize;