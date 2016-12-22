import {ReduceStore} from 'flux/utils';
import AppDispatcher from './AppDispatcher';
import Immutable from 'immutable';

class AppStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
    switch(action.type) {
      case 'test':
        console.log(state.set('a', 22));
        return state.set('a', 22);
      default:
        return state;
    }
  }
}

export default new AppStore();