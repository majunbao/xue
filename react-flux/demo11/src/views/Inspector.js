import {h, render, Component} from 'preact';

class Inspector extends Component {

  state = {
    log: {}
  }

  add = (canvasObj) => {
    this.props.onAddCanvas(canvasObj)
  }

  addNum = (num) => {
    let x = 0, y = 0, split= 768/num;
    for(let i=0; i<num; i++) {
      x = split*i;
       this.props.onAddCanvas({type: 'rect',width: split-4+'px', height: split-4+'px',x: x, y: y});  
       this.props.onAddCanvas({type: 'circle',width: split-4+'px', height: split-4+'px',x: x, y: y+100});  
       this.props.onAddCanvas({type: 'triangle',width: split-4+'px', height: split-4+'px',x: x, y: y+200});  
       this.props.onAddCanvas({type: 'rect',width: split-4+'px', height: split-4+'px',x: x, y: y+300});  
       this.props.onAddCanvas({type: 'circle',width: split-4+'px', height: split-4+'px',x: x, y: y+400});  
       this.props.onAddCanvas({type: 'triangle',width: split-4+'px', height: split-4+'px',x: x, y: y+500});  
    }
  }

  delete = (id) => {
    this.props.onDeleteCanvas(id)
  }

  updata = (canvasObj) => {
    this.props.onUpdataCanvas(this.props.getCanvasBySelected(), canvasObj)
  }

  
  log = () => {
    this.setState({
      log: CanvasActions.getAll()
    })
  }

  render(props, state) {
    let style = {fontSize: '12px'};
    let selectedCanvasId = props.getCanvasBySelected();
    return (
      <div style={style}>
        <br />
        <button onClick={()=>{alert(`您当前选中的是：${props.getCanvasBySelected()}`)}}>getCanvasBySelected</button>
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