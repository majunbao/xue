import {h, render, Component, cloneElement} from 'preact';
import {UXDrag, UXResize} from '../uxkit/uxkit';
import New from './New';

class Canvas extends Component {
  state = {
    canvas: [
      {
        key: 'sdjflsdfj',
        type: 'UXCircle',
        x: '10px',
        y: '20px',
        width: '100px',
        height: '200px'
      },
      {
        key: '2',
        type: 'UXCircle',
        x: '300px',
        y: '200px',
        width: '200px',
        height: '200px'
      },
      {
        key: '3',
        type: 'UXCircle',
        x: '400px',
        y: '200px',
        width: '200px',
        height: '200px'
      }
    ]
  }

  changeLayout = () => {
    this.setState(Object.assign({}, {...this.state}, {canvas: [{
        key: '2e',
        type: 'UXCircle',
        x: '50px',
        y: '20px',
        width: '100px',
        height: '200px'
      },]}))
  }

  render(props, state) {
    return (
      <div>
        {
          state.canvas.map((item) => {
            return <New {...item} />
          })
        }
        <button onClick={this.changeLayout}>anniao</button>
      </div>
    )
  }
}

export default Canvas;  