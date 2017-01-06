import CanvasStore from '../stores/CanvasStore';

const CanvasActions = {
  add: (ele) => {
    CanvasStore.addCanvas();
  }
}

export default CanvasActions;