import {h, render, Component} from 'preact';
import {UXDrag, UXResize} from '../uxkit/uxkit';

class Canvas extends Component {


  render(props, state) {
    return (
      <div>
        <UXDrag>
          <svg width="200" height="200">
            <rect fill="#ff0000" width="150" height="150" x="20" y="20"></rect>
          </svg>
        </UXDrag>
        <UXResize></UXResize>
      </div>
    )
  }
}



export default Canvas;