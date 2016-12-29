import {h, render, Component, cloneElement} from 'preact';
import {addEvent, removeEvent, prefixCssProp} from './UXDom';
import UXEvent from './UXEvent';

class UXDrag extends Component {
  state = {
    x: this.props.x || 0,
    y: this.props.y || 0,

    isSVGElement: false
  }

  componentDidMount() {
    this.setState({
      isSVGElement: this.base instanceof SVGElement && !!this.base.ownerSVGElement
    })
  }

  handleDrag = (data) => {
    this.setState({
      x: data.dx,
      y: data.dy
    });
  }

  onDrag = (data) => {
    this.handleDrag(data);
    typeof this.props.onDrag == 'function' && this.props.onDrag(data);
  }

  render(props, state) {
    let style = {}, svgTransform = null;

    if(state.isSVGElement) {
      svgTransform = `translate(${state.x} ${state.y})`
    }else {
      style[prefixCssProp('transform')] = `translate(${state.x}px, ${state.y}px)`
    }

    return (
      <UXEvent onDrag={this.onDrag}>
        {cloneElement(props.children[0], {
          style: {...style},
          transform: svgTransform
        })}
      </UXEvent>
    )
  }
}

export default UXDrag;