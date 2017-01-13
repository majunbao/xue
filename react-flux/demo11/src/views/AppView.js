import {h, render, Component} from 'preact';
import Top from './appLayout/top';
import Left from './appLayout/Left';
import Center from './appLayout/Center';
import Right from './appLayout/Right';

import LayoutActions from '../actions/LayoutActions';
import CanvasActions from '../actions/CanvasActions';
import LayoutStore from '../stores/LayoutStore';
import CanvasStore from '../stores/CanvasStore';

import Event from './base/Event';

const getStores = () => {

}

const getState = {
  layout: LayoutStore.getState(), // 界面布局数据
  canvas: CanvasStore.getState(), // 画布数据

  getCanvasById: null, //根据id获取组件，类似于getElementById
  getCanvasBySelected: CanvasStore.getCanvasBySelected, //获取选中的第一个组件组件，返回id字符串
  getAllCanvasBySelected: null, //获取选中的全部组件，返回id数组

  onUpdataLayout: LayoutActions.updataLayout,  //更新页面布局
  onUpdataCanvas: CanvasActions.updataCanvas,  //更新一个组件
  onAddCanvas: CanvasActions.addCanvas,        //添加一个组件
  onDeleteCanvas: CanvasActions.deleteCanvas,  //删除一个组件
  onSelectCanvas: CanvasActions.selectCanvas,  //选中一个组件
  
}

class AppView extends Component {
  componentDidMount() {
    LayoutStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    LayoutStore.removeChangeListener(this._onChange)
  }

  render({props = getState}) {
    return (
      <div>
        <Top {...props} />
        <Left {...props} />
        <Center {...props} />
        <Right {...props} />
      </div>
    );
  }

  _onChange = () => {
    this.setState(getState);
  }
}

export default AppView;