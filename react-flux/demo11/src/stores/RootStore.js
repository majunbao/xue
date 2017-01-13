import {EventEmitter} from 'events';

export default class Store {
  constructor() {
    this.eventType = 'change'
  }
  
  addChangeListener = function(callback) {
    EventEmitter.prototype.on(this.eventType, callback);
  };

  removeChangeListener = function(callback) {
    EventEmitter.prototype.off(this.eventType, callback);
  }

  emit = function() {
    EventEmitter.prototype.emit(this.eventType)
  }
}