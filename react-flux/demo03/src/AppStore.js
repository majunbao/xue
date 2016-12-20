import {ReduceStore} from 'flux/utils';
import AppDispatcher from './AppDispatcher';

class AppStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return '2qe';
  }

  reduce(state, action) {
    switch(action.type) {
      default:
        return state;
    }
  }
}

export default new AppStore();