import AppDispatcher from '../dispatcher/AppDispatcher';

const Actions = {
  addNav(text) {
    AppDispatcher.dispatcher({
      actionType: 'ADD_NEW_ITEM',
      text: text
    })
  }
}