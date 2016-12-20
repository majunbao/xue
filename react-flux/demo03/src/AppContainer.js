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
    value: AppStore.getState()
  }
}

export default Container.createFunctional(AppView, getStores, getState);