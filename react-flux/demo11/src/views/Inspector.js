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

  update = (id, canvasObj) => {
    CanvasActions.update(id, canvasObj);
  }

  onLayout = (direction, num) => {
    this.props.onUpdataLayout({
      [direction]: this.props.layout[direction] == 0 ? num: 0
    })
  }

  log = () => {
    this.setState({
      log: CanvasActions.getAll()
    })
  }

  render(props, state) {
    return (
      <div>
        <br />
        <button onClick={()=>{this.add({type: 'rect',width: '300px', height: '100px', fill: 'green'})}}>rect</button>
        <button onClick={()=>{this.add({type: 'circle'})}}>circle</button>
        <button onClick={()=>{this.add({type: 'triangle'})}}>triangle</button>
        <button onClick={()=>{this.update('ssd', {type: 'triangle'})}}>update</button>
        <button onClick={this.add}>random</button>
        <button onClick={()=>{this.addNum(10)}}>60</button>
        <br />
        <button onClick={this.delete}>删除</button>
        <br />
        <button onClick={()=>{this.onLayout('left', '200px')}}>layout-left</button>
        <button onClick={()=>{this.onLayout('top', '60px')}}>layout-top</button>
        <br />
        <button onClick={()=>{this.log()}}>log</button>
        <div style={{fontSize: '12px'}}><pre>{JSON.stringify(state.log).replace(/,/g, ',\n')}</pre></div>
        <button onClick={()=>{}}>New 1</button>
      </div>
    )
  }
}

export default Inspector;