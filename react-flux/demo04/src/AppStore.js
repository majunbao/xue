import {ReduceStore} from 'flux/utils';
import AppDispatcher from './AppDispatcher';
import Immutable from 'immutable';

class AppStore extends ReduceStore {

  getInitialState() {
    return []
  }

  reduce(state, action) {
    switch(action.type) {
      case 'test':
        state.push({text: action.text})
        return state.slice(0);
      case 'sort':
        state.reverse()
        return state.slice(0);
      default:
        return state;
    }
  }
}

export default new AppStore(AppDispatcher);