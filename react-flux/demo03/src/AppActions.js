import AppDispatcher from './AppDispatcher';

const AppActions = {
  test(text) {
    AppDispatcher.dispatch({
      type: 'test',
      text: text
    })
  }
}

export default AppActions;