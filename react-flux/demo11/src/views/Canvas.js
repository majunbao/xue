import {h, render, Component, cloneElement} from 'preact';
import {UXDrag, UXResize} from '../uxkit/uxkit';
import New from './New';
import CanvasModel from '../models/CanvasModel';

class Canvas extends Component {
  model = new CanvasModel();

  changeLayout = () => {
    this.model.addCanvas();
    this.setState(this.model.canvas)
  }

  log = () => {
    console.log(this.model.getModel())
  }

  render(props, {canvas = this.model.canvas}) {
    return (
      <div>
        {
          canvas.map((item) => {
            return <New {...item} />
          })
        }
        <button onClick={this.changeLayout}>anniao</button>
        <button onClick={this.log}>log</button>
      </div>
    )
  }
}

export default Canvas;  