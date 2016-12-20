import {ReduceStore} from 'flux/utils';
import AppDispatcher from './AppDispatcher';

class NewValueStore extends ReduceStore {
  constructor() {
    super(AppDispatcher)
  }

  getInitialState() {
    return '';
  }

  reduce(state, action) {
    switch(action.type) {
      default:
        return action.text
    }
  }
}

export default new NewValueStore();