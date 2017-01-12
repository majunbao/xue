import LayoutStore from '../stores/LayoutStore';

const LayoutActions = {
  updataLayout: function(config){
    LayoutStore.updataLayout(config);
  }
}

export default LayoutActions;