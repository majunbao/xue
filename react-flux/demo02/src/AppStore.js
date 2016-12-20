import {ReduceStore} from 'flux/utils';
import AppDispatcher from './AppDispatcher';
import Immutable from 'immutable';

class AppStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return {
      draft: '',
      list: []
    };
  }

  reduce(state, action) {
    switch(action.type){
      case 'add':
        state.list.push(state.draft);
        console.log(state)
        return state;
      case 'updateDraft':
        state.draft = action.text;
        console.log(state)
        return state;
      default:
        return state;
    }
  }
}

export default new AppStore();