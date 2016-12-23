import {ReduceStore} from 'flux/utils';
import AppDispatcher from './AppDispatcher';

class AppStore extends ReduceStore {
  getInitialState() {
    return true
  }

  reduce(state, action) {
    return !state
  }
}

export default new AppStore(AppDispatcher)