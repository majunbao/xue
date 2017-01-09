import CanvasStore from '../stores/CanvasStore';

const CanvasActions = {
  add: (canvasObj) => {
    CanvasStore.addCanvas(canvasObj);
  },
  getAll: () => {
    return CanvasStore.getStore();
  }
}

export default CanvasActions;