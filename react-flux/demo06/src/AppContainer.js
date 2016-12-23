import {Container} from 'flux/utils';
import AppView from './AppView';
import AppStore from './AppStore';
import AppActions from './AppActions';

function getStores() {
  return [
    AppStore
  ]
}

function getState() {
  return {
    onStopDrag: AppActions.dragStop,

    draging: AppStore.getState()
  }
}

export default Container.createFunctional(AppView, getStores, getState);