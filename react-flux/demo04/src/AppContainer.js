import {Container} from 'flux/utils';
import AppStore from './AppStore';
import AppView from './AppView';
import AppActions from './AppActions';
import AppDispatcher from './AppDispatcher';


function getStore() {
  return [
    AppStore
  ]
}

function getState() {
  return {
    val: AppStore.getState(),

    onTest: AppActions.test,
    onSort: AppActions.sort
  }
}

export default Container.createFunctional(AppView, getStore, getState);