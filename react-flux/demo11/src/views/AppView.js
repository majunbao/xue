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
  layout: LayoutStore.getState(),
  canvas: CanvasStore.getState(),

  onUpdataLayout: LayoutActions.updataLayout,
  onUpdataCanvas: CanvasActions.updataCanvas,
  onAddCanvas: CanvasActions.addCanvas,
  onDeleteCanvas: CanvasActions.deleteCanvas,
  onSelectCanvas: CanvasActions.selectCanvas,
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