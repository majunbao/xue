// 图形 三角形

export class MSText {

  constructor(data) {
    if (data) {
      this.setState(data);
    }
    this.render()
  }

  //数据存储
  data = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    text: '三角形'
  };

  dom = null;

  getData() {
    return this.data;
  }

  setData(newData) {
    for (let key in newData) {
      this.data[key] = newData[key];
    }
  }

  getDom() {
    return this.dom;
  }

  render() {
    this.dom = document.createElement('h1');
    this.dom.innerText = this.getData().text;
  }

  reRender() {
    $(this.getDom()).html(this.getData().text);
  }

  update(data) {
    this.setData(data);
    this.reRender();
  }

  destroy() {
    console.log('###销毁')
    $(this.getDom()).off();
    $(this.getDom()).remove()
  }

}