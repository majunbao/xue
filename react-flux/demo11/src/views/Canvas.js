import {h, render, Component, cloneElement} from 'preact';
import {UXDrag, UXResize} from '../uxkit/uxkit';
import New from './New';
import CanvasStore from '../stores/CanvasStore';

class Canvas extends Component {
  componentDidMount() {
    CanvasStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    CanvasStore.removeChangeListener(this._onChange)
  }

  render(props, {canvas = CanvasStore.getStore()}) {
    return (
      <div>
        {
          canvas.map((item) => {
            return <New {...item} />
          })
        }
      </div>
    )
  }
  
  _onChange = () => {
    this.setState(CanvasStore.getStore());
  }
}

export default Canvas;  