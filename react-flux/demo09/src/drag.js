import {h, render, Component} from 'preact';

import SidebarStore from './store/Sidebar';

class Drag extends Component {
  constructor(){
    super();
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.dargStart = this.dargStart.bind(this);
    this.dargStop = this.dargStop.bind(this);
    this.dargHandle = this.dargHandle.bind(this);
    this.style = {
      width: '100px',
      height: '100px',
      fontSize: '30px',
      color: '#fff'
    };
  }

  dargHandle(e) {
    this.dx = e.pageX - this.x;
    this.dy = e.pageY - this.y;
    this.base.style.transform = `translate(${this.dx}px,${this.dy}px)`;
  }

  dargStart(e) {
    e.preventDefault();
    this.x = e.pageX - this.dx;
    this.y = e.pageY - this.dy;
    document.addEventListener('mousemove', this.dargHandle, false);
  }

  dargStop(e) {
    document.removeEventListener('mousemove', this.dargHandle, false);

    this.props.onSort(this.props.index, this.dx, this.dy);

    this.dx = 0;
    this.dy = 0;
    this.base.style.transform = '';
  }

  render(props, state){
    return <div draggable="true" onDrag={function(){console.log(1)}} OnDragDrop={()=>{console.log(1)}} style={this.style} onMouseDown={this.dargStart} onMouseUp={this.dargStop}>{props.children}</div>;
  }
}

class DragGroup extends Component {
  constructor(){
    super();
    this.dargSort = this.dargSort.bind(this);
    this.height = 100;
    this.state = {
      list: SidebarStore
    };
  }

  // 拖拽排序 核心
  dargSort(index, dx, dy) {
    let newState = this.state.list.slice(0);
    if(parseInt(dy/this.height)>=this.state.list.length){
      console.log(2)
    }else {
      newState[index] = newState.splice(parseInt(dy/this.height)+index, 1, newState[index])[0];
      this.setState({
        list: newState
      });  
    };
    console.log(parseInt(dy/this.height), index)
    
  }

  render(props, state) {
    let group = this.state.list.map((text, i) => {
      return <Drag index={i} onSort={this.dargSort}><img src={text} width="100" height="100" /></Drag>
    });
    return <div>{group}</div>
  }
}
export {DragGroup};
export default Drag;
