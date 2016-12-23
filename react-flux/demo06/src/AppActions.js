import AppDispatcher from './AppDispatcher';

const AppActions = {
  dragStop(t) {
    AppDispatcher.dispatch({
      type: 'dragStop',
      t: t
    })
  }
}

export default AppActions;