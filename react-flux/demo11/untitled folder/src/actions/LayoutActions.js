import LayoutStore from '../stores/LayoutStore';

const LayoutActions = {
  getLayout: LayoutStore.getStore,
  setLayout: function(config){
    LayoutStore.setLayout(config);
  }
}

export default LayoutActions;