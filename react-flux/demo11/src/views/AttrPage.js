import {h, render, Component} from 'preact';

class Inspector extends Component {

  updata = (canvasObj) => {
    this.props.onUpdataCanvas(this.props.getCanvasBySelected(), canvasObj)
  }

  render(props, state) {
    let style = {fontSize: '12px'};
    let selectedCanvasId = props.getCanvasBySelected();
    return (
      <div style={style}>
        <br />
        <button onClick={()=>{alert(`您当前选中的是：${props.getCanvasBySelected()}`)}}>getCanvasBySelected</button>
        <button onClick={()=>{props.onCancelSelected()}}>onCancelSelected</button>
        <br />
        <br />
        {selectedCanvasId?
          <div>
            <span>属性</span>
            <ul>
              <li>宽度：
                <input
                  type="number"
                  value={props.canvas[selectedCanvasId].width}
                  onInput={(e)=>{this.updata({width: e.target.value})}}
                 /> px
              </li>
              <li>高度：
                <input
                  type="number"
                  value={props.canvas[selectedCanvasId].height}
                  onInput={(e)=>{this.updata({height: e.target.value})}}
                 /> px
              </li>
              <li>X：
                <input
                  type="number"
                  value={props.canvas[selectedCanvasId].x}
                  onInput={(e)=>{this.updata({x: e.target.value})}}
                 /> px
              </li>
              <li>Y：
                <input
                  type="number"
                  value={props.canvas[selectedCanvasId].y}
                  onInput={(e)=>{this.updata({y: e.target.value})}}
                 /> px
              </li>
              <li>填充：
                <input type="color" 
                  value={props.canvas[selectedCanvasId].fill}
                  onChange={(e)=>{this.updata({fill: e.target.value})}}
                />
              </li>
            </ul>
          </div>:null
        }
      </div>
    )
  }
}

export default Inspector;