import {uuid} from '../uxkit/UXUtil';
import {EventEmitter} from 'events';
import RootStore from './RootStore';
import LayoutStore from './LayoutStore';

const CHANGE_EVENT = 'changeCanvas'
let _canvas = {};

class CanvasStore extends RootStore {
  addCanvas = function(canvasObj){
    const w = 150, h = 150, id = uuid();
    _canvas[id] = {
      ...{
        key: id,
        type: canvasObj.type,
        x: parseInt(LayoutStore.getStore().canvasWidth)/2 - parseInt(canvasObj.width||w)/2,
        y: parseInt(LayoutStore.getStore().canvasHeight)/2 - parseInt(canvasObj.height||h)/2,
        width: w + 'px',
        height: w + 'px'
      }, ...canvasObj
    };
    EventEmitter.prototype.emit(CHANGE_EVENT);
  };
  getStore = function(){
    return _canvas;
  }
}

export default new CanvasStore(CHANGE_EVENT);