import AppActions from './AppActions';
import AppView from './AppView';
import AppDispatcher from './AppDispatcher';
import AppStore from './AppStore';
import {Container} from 'flux/utils';

function getStores() {
  return [
    AppStore
  ]
}

function getState() {
  return {
    value: AppStore.getState(),

    onTest: AppActions.test
  }
}

export default Container.createFunctional(AppView, getStores, getState);