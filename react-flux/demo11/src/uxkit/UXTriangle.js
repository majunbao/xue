import {h, render, Component} from 'preact';
import UXResize from './UXResize';

class UXTriangle extends Component {
  state = {
    w: parseInt(this.props.width),
    h: parseInt(this.props.height),
    isSelected: this.props.isSelected
  }

  onResize = (data) => {
    this.setState({
      w: parseInt(data.w),
      h: parseInt(data.h)
    })
  }

  onMoveStart = (data) => {
    this.setState({
      isSelected: true
    })
  }

  render(props, state) {
    let points = `${state.w/2},0 ${state.w},${state.h} 0,${state.h}`;
    return (
      <UXResize {...props}>
        <svg width="100%" height="100%">
          <polygon
            points = {points}
          />
        </svg>
      </UXResize>
    )
  }
}

export default UXTriangle;