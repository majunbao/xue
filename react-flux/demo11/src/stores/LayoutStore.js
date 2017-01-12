import {EventEmitter} from 'events';
import RootStore from './RootStore';

const CHANGE_EVENT = 'change'
const defaultLayout = {
  top: '60px',
  left: '200px',
  right: '270px',
  minHeight: '650px',
  mixWidth: '1000px',
  canvasWidth: '768px',
  canvasHeight: '576px'
}

let _layout = defaultLayout;

class LayoutStore extends RootStore {
  getState = function() {
    return _layout;
  };
  
  updataLayout = function(config) {
    for(let key in config) {
      _layout[key] = config[key]
    }
    EventEmitter.prototype.emit(CHANGE_EVENT);
  };
}

export default new LayoutStore(CHANGE_EVENT);