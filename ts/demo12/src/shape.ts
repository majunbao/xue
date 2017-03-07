class Rect {
  domElement: HTMLElement;

  constructor() {
    this.render();
    this.bind();
    this.layout();
    this.show();
  }

  render() {
    this.domElement = document.createElement('div');
  }

  bind() {
    this.domElement.addEventListener('mousedown', this.onMouseDown);
  }

  layout() {
    this.domElement.setAttribute('style', 'width:50px;height:50px;background-color:red;');
  }

  show() {
    this.domElement.removeAttribute('hidden');
    document.body.appendChild(this.domElement);
  }

  hide() {
    this.domElement.setAttribute('hidden', 'hidden');
    this.domElement.classList.remove('visible');
  }

  destroy() {
    this.domElement.removeEventListener('mousedown', this.onMouseDown);
    this.domElement.remove();
  }

  onMouseDown = () => {
    this.hide();
  }
}

export default Rect;