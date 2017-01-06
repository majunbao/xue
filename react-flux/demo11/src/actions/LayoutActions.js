import LayoutStore from '../stores/LayoutStore';

const LayoutActions = {
  getLayout: LayoutStore.getLayout,
  setLayout: function(config){
    LayoutStore.setLayout(config);
  }
}

export default LayoutActions;