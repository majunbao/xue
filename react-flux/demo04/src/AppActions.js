import AppDispatcher from './AppDispatcher';

const AppActions = {
  test(text) {
    AppDispatcher.dispatch({
      type: 'test',
      text: text
    })
  },
  sort() {
    AppDispatcher.dispatch({
      type: 'sort'
    })
  }
}

export default AppActions;