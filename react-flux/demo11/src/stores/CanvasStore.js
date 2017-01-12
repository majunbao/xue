import {uuid} from '../uxkit/UXUtil';
import {EventEmitter} from 'events';
import RootStore from './RootStore';
import LayoutStore from './LayoutStore';

const CHANGE_EVENT = 'change'
let _canvas = {};

class CanvasStore extends RootStore {
  addCanvas = function(newData){
    const w = 150, h = 150, id = uuid();
    _canvas[id] = {
      ...{
        id: id,
        type: newData.type,
        x: parseInt(LayoutStore.getState().canvasWidth)/2 - parseInt(newData.width||w)/2,
        y: parseInt(LayoutStore.getState().canvasHeight)/2 - parseInt(newData.height||h)/2,
        width: w + 'px',
        height: w + 'px'
      }, ...newData
    };
    this.selectCanvas(id);
    EventEmitter.prototype.emit(CHANGE_EVENT);
  };

  updataCanvas = function(id, updateData) {
    if(id in _canvas) {
      Object.keys(updateData).forEach(function(key){
        _canvas[id][key] = updateData[key];
      });
      EventEmitter.prototype.emit(CHANGE_EVENT);
    }
  };

  deleteCanvas = function(id) {
    if(id in _canvas) {
      delete _canvas[id];
    }
  };

  selectCanvas = function(id) {
    if(id in _canvas) {
      Object.keys(_canvas).map((item) => {
        delete _canvas[item].isSelected
      });
      _canvas[id].isSelected = true;
    }
  }

  getState = function() {
    return _canvas;
  };
}

export default new CanvasStore(CHANGE_EVENT);