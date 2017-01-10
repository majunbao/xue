import {h, render, Component, cloneElement} from 'preact';
import {UXDrag, UXResize, UXShape} from '../uxkit/uxkit';
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
          Object.keys(canvas).map((item) => {
            return <UXShape {...canvas[item]} onMouseDown={(id)=>{CanvasStore.update(id, {width: '20px'})}} />
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