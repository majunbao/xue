import LayoutStore from '../stores/LayoutStore';

const LayoutActions = {
  updateLayout: function(config){
    LayoutStore.updateLayout(config);
  }
}

export default LayoutActions;