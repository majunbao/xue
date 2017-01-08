import CanvasStore from '../stores/CanvasStore';

const CanvasActions = {
  add: (canvasObj) => {
    CanvasStore.addCanvas(canvasObj);
  }
}

export default CanvasActions;