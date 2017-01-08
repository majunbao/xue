import {EventEmitter} from 'events';

export default class Store {
  constructor(eventType) {
    this.eventType = eventType
  }
  
  addChangeListener = function(callback) {
    EventEmitter.prototype.on(this.eventType, callback);
  };

  removeChangeListener = function(callback) {
    EventEmitter.prototype.off(this.eventType, callback);
  }
}