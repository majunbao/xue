class Marquee {
  private domElement: HTMLElement;
  private state: {
    w: number;
    h: number;
    x: number;
    y: number
  };

  constructor() {
    this.state = {
      w: 0,
      h: 0,
      x: 0,
      y: 0
    };

    this.render();
    this.bind();
    this.layout();
  }

  render() {
    this.domElement = document.createElement('div');
  }

  bind() {
    document.addEventListener('mousedown', this.onMouseDown);
  }

  layout() {
    this.domElement.setAttribute('style', `
      width: ${this.state.w}px;
      height: ${this.state.h}px;
      left: ${this.state.x}px;
      top: ${this.state.y}px;
    `);
  }

  show() {

  }

  hide() {

  }

  destroy() {

  }

  onMouseDown = (e) => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e) => {
    console.log(2)
  }

  onMouseUp = (e) => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
}

export default Marquee;