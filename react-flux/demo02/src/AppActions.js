import AppDispatcher from './AppDispatcher';

const Actions = {
  add(text) {
    AppDispatcher.dispatch({
      type: 'add',
      text: text
    })
  },
  updateDraft(text) {
    AppDispatcher.dispatch({
      type: 'updateDraft',
      text: text
    })
  }
}

export default Actions;