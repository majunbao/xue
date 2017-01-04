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
    height: this.state.height
  }
  resizeHandleStyle = {
    width: '8px',
    height: '8px',
    border: '1px solid #808080',
    backgroundColor: '#69e0a1',
    position: 'absolute'
  }

  onTopLeft = (data) => {
    this.handleTop(data);
    this.handleLeft(data);
    typeof this.props.onResize == 'function' && this.props.onResize(data);
  }

  onTopCenter = (data) => {
    this.handleTop(data);
    typeof this.props.onResize == 'function' && this.props.onResize(data);
  }

  onTopRight = (data) => {
    this.handleTop(data);
    this.handleRight(data);
    typeof this.props.onResize == 'function' && this.props.onResize(data);
  }

  onCenterRight = (data) => {
    this.handleRight(data);
    typeof this.props.onResize == 'function' && this.props.onResize(data);
  }

  onCenterLeft = (data) => {
    this.handleLeft(data)
    typeof this.props.onResize == 'function' && this.props.onResize(data);
  }

  onBottomLeft = (data) => {
    this.handleBottom(data);
    this.handleLeft(data);
    typeof this.props.onResize == 'function' && this.props.onResize(data);
  }

  onBottomCenter = (data) => {
    this.handleBottom(data)
    typeof this.props.onResize == 'function' && this.props.onResize(data);
  }

  onBottomRight = (data) => {
    this.handleBottom(data);
    this.handleRight(data);
    typeof this.props.onResize == 'function' && this.props.onResize(data);
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

  render(props, state) {
    return (
      <div style={{...this.resizeStyle, ...{width: state.width, height: state.height, left: state.left, top: state.top}}}>
        <UXEvent onDrag={this.onTopLeft}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'nwse-resize', top: '-4px', left: '-4px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onTopCenter}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'ns-resize', top: '-4px', left: '50%', marginLeft: '-5px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onTopRight}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'nesw-resize', top: '-4px', right: '-4px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onCenterLeft}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'ew-resize', top: '50%', marginTop: '-5px', left: '-4px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onCenterRight}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'ew-resize', top: '50%', marginTop: '-5px', right: '-4px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onBottomLeft}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'nesw-resize', bottom: '-4px', left: '-4px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onBottomCenter}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'ns-resize', bottom: '-4px', left: '50%', marginLeft: '-5px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onBottomRight}>
          <div style={{...this.resizeHandleStyle, ...{cursor: 'nwse-resize', bottom: '-4px', right: '-4px'}}}></div>
        </UXEvent>
        <UXEvent onDrag={this.onMove}>
          <svg width="100%" height="100%">
            <rect width="100%" height="100%" />
          </svg>
        </UXEvent>
      </div>
    )
  }
}

export default UXResize;