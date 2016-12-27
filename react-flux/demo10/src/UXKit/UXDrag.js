import {h, render, Component, cloneElement} from 'preact';
import {addEvent, removeEvent} from './UXDom';
import UXEvent from './UXEvent';

class UXDrag extends Component {
  state = {
    transform: "translate(0px, 0px)"
  }

  handleDrag = (data) => {
    this.setState({
      transform: `translate(${data.dx}px, ${data.dy}px)`
    });
  }

  onDrag = (data) => {
    this.handleDrag(data);
    typeof this.props.onDrag == 'function' && this.props.onDrag(data);
  }

  render(props, state) {
    return (
      <UXEvent onDrag={this.onDrag}>
        {cloneElement(props.children[0], {
          style: {...state}
        })}
      </UXEvent>
    )
  }
}

export default UXDrag;