import {h, render, Component} from 'preact';
import CanvasActions from '../actions/CanvasActions';
import LayoutActions from '../actions/LayoutActions';

class Inspector extends Component {

  state = {
    log: {}
  }

  add = (canvasObj) => {
    CanvasActions.add(canvasObj);
  }

  addNum = (num) => {
    let x = 0, y = 0, split= 768/num;
    for(let i=0; i<num; i++) {
      x = split*i;
      CanvasActions.add({type: 'rect',width: split-4+'px', height: split-4+'px',x: x, y: y});  
      CanvasActions.add({type: 'circle',width: split-4+'px', height: split-4+'px',x: x, y: y+100});  
      CanvasActions.add({type: 'triangle',width: split-4+'px', height: split-4+'px',x: x, y: y+200});  
      CanvasActions.add({type: 'rect',width: split-4+'px', height: split-4+'px',x: x, y: y+300});  
      CanvasActions.add({type: 'circle',width: split-4+'px', height: split-4+'px',x: x, y: y+400});  
      CanvasActions.add({type: 'triangle',width: split-4+'px', height: split-4+'px',x: x, y: y+500});  
    }
  }

  update = (id, canvasObj) => {
    CanvasActions.update(id, canvasObj);
  }

  onLayout = (direction, num) => {
    this.props.onUpdateLayout({
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
        <button onClick={()=>{this.add({type: 'rect',width: '300px', height: '100px', fill: 'red', isSelected: {true}})}}>rect</button>
        <button onClick={()=>{this.add({type: 'circle'})}}>circle</button>
        <button onClick={()=>{this.add({type: 'triangle'})}}>triangle</button>
        <button onClick={()=>{this.update('ssd', {type: 'triangle'})}}>update</button>
        <button onClick={this.add}>random</button>
        <button onClick={()=>{this.addNum(10)}}>60</button>
        <br />
        <button onClick={this.add}>删除</button>
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