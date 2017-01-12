import {h} from 'preact';
import {UXDrag, UXResize, UXShape} from '../uxkit/uxkit';
import Event from './base/Event';
import ResizeCore from './base/ResizeCore';
import Rect from './shape/Rect.js';

function Canvas(props) {
  return (
    <div>
      {
        Object.keys(props.canvas).map((item) => {
          return <UXShape {...props} {...props.canvas[item]} />
        })
      }
    </div>
  )
}

export default Canvas;

