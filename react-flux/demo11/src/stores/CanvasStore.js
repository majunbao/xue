import {uuid} from '../uxkit/UXUtil';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'changeCanvas'

let _canvas = [];

const CanvasStore = {

  addChangeListener: function(callback) {
    EventEmitter.prototype.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    EventEmitter.prototype.off(CHANGE_EVENT, callback);
  },

  addCanvas: function(){
     _canvas = _canvas.concat({
      key: uuid(),
      type: 'UXRect',
      x: '150px',
      y: '20px',
      width: '100px',
      height: '200px'
    });
    EventEmitter.prototype.emit(CHANGE_EVENT);
  },

  getStore: function(){
    return _canvas;
  }

}

export default CanvasStore;