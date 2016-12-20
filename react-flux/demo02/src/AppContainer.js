import AppStore from './AppStore';
import AppView from './AppView';
import AppActions from './AppActions';
import {Container} from 'flux/utils';

function getStores() {
  return [
    AppStore
  ]
}

function getState() {
  return {
    lists: AppStore.getState(),
    numberList: AppStore.getState().list,
    draft: AppStore.getState().draft,
    onAdd: AppActions.add,
    onUpdateDraft: AppActions.updateDraft,
    onAdd: AppActions.add
  }
}

export default Container.createFunctional(AppView, getStores, getState);