import {h, render, Component} from 'preact';
import CanvasActions from '../actions/CanvasActions';
import LayoutActions from '../actions/LayoutActions';

class Inspector extends Component {

  add = (ele) => {
    CanvasActions.add(ele);
  }

  onLayout = (direction, num) => {

    LayoutActions.setLayout({
      [direction]: LayoutActions.getLayout()[direction] == 0 ? num: 0
    });
  }

  render(props, state) {
    return (
      <div>
        <button onClick={this.add}>add</button>
        <button onClick={this.add}>delete</button>
        <button onClick={this.add}>update</button>
        <br />
        <button onClick={()=>{this.onLayout('top', '60px')}}>layout-top</button>
        <button onClick={()=>{this.onLayout('left', '200px')}}>layout-left</button>
        <div style={{fontSize: '12px'}}><pre>{JSON.stringify({}).replace(/,/g, ',\n')}</pre></div>
      </div>
    )
  }
}

export default Inspector;