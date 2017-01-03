import {h, render, Component, cloneElement} from 'preact';
import {UXDrag, UXResize} from '../uxkit/uxkit';
import UXCircle from '../uxkit/UXCircle';

class Canvas extends Component {
  state = {
    canvas: [
      {
        id: 'sdjfsif',
        element: 'UXCircle',
      }
    ]
  }

  render(props, state) {
    return (
      <div>
        {cloneElement(<div>nihao</div>)}
      </div>
    )
  }
}

export default Canvas;