import {h} from 'preact';
import DragCore from '../base/DragCore';
import ResizeCore from '../base/ResizeCore';

function Rect(props) {

  let onDragStart = (data) => {
    props.onSelectCanvas(props.id);
    props.onUpdataCanvas(props.id, {});

  }

  let onDrag = (data) => {
    props.onUpdataCanvas(props.id, {x: props.x+data.mx, y: props.y+data.my});
  }

  let onResize = (data) => {
    let {width, height, x, y} = data;
    if(width<0) {
      x = x + width;
      width = width * -1;
    }
    if(height<0) {
      y = y + height;
      height = height * -1;
    }
    props.onUpdataCanvas(props.id, {x: x, y: y, width: width, height: height});
  }

  return (
    <div>
      <ResizeCore {...props} onResize={onResize}></ResizeCore>
      <DragCore onDrag={onDrag} onDragStart={onDragStart}>
        <svg width={props.width} height={props.height} style={{left: props.x, top: props.y, position: 'absolute'}}>
          <rect width="100%" height="100%" fill={props.fill} />
        </svg>
      </DragCore>
    </div>
  )
}

export default Rect;