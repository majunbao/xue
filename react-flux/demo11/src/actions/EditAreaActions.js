import EditAreaStore from '../stores/EditAreaStore';

const EditAreaActions = {
  addCanvas: (newData) => {
    EditAreaStore.addCanvas(newData);
  },
  updataCanvas: (id, updateData) => {
    EditAreaStore.updataCanvas(id, updateData);
  },
  deleteCanvas: (id) => {
    EditAreaStore.deleteCanvas(id);
  },
  selectCanvas: (id) => {
    EditAreaStore.selectCanvas(id);
  },
  cancelSelected: () => {
    EditAreaStore.cancelSelected();
  }
}

export default EditAreaActions;