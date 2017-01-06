import {EventEmitter} from 'events';

const CHANGE_EVENT = 'changeLayout'

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

const LayoutStore = {
  getLayout: function() {
    return _layout;
  },
  setLayout: function(config) {
    for(let key in config) {
      _layout[key] = config[key]
    }

    EventEmitter.prototype.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    EventEmitter.prototype.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    EventEmitter.prototype.off(CHANGE_EVENT, callback);
  },
}

export default LayoutStore;