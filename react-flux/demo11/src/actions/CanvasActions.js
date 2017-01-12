import CanvasStore from '../stores/CanvasStore';

const CanvasActions = {
  addCanvas: (newData) => {
    CanvasStore.addCanvas(newData);
  },
  updataCanvas: (id, updateData) => {
    CanvasStore.updataCanvas(id, updateData);
  },
  deleteCanvas: (id) => {
    CanvasStore.deleteCanvas(id);
  },
  selectCanvas: (id) => {
    CanvasStore.selectCanvas(id);
  }
}

export default CanvasActions;