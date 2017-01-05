import {uuid} from '../uxkit/UXUtil';

export default class CanvasModel {
  constructor() {
    this.canvas = [{
      key: uuid(),
      type: 'UXCircle',
      x: '140px',
      y: '20px',
      width: '100px',
      height: '200px'
    }];
  }

  addCanvas = () => {
    this.canvas = this.canvas.concat({
      key: uuid(),
      type: 'UXCircle',
      x: '150px',
      y: '20px',
      width: '100px',
      height: '200px'
    });
  }

  getModel = () => {
    return this.canvas;
  }
}
