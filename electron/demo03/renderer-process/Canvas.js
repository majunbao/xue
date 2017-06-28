import { h, render, Component } from 'preact';
import Circle from './Circle';
import Triangle from './Triangle';
import Store from 'Store.js';

export default class Canvas extends Component {
  addCircle() {
    let circle = new Circle();
    circle.render();
    Store.add(circle);
  }

  addTriangle() {
    let triangle = new Triangle();
    triangle.render();
    Store.add(triangle);
  }

  query() {
    let elementList = Store.getElementList();
    console.log(elementList);
  }

  update() {
    Store.get(0).update({ text: '大44' });
  }

  delete() {
    Store.get(0).destroy();
    Store.removeForIndex(0);

  }

  render() {
    return (
      <div id="view">
        <div>
          <button onClick={this.addCircle}>添加圆形（react）</button>
          <button onClick={this.addTriangle}>添加三角形（jquery）</button>
          <button onClick={this.query}>全部实例</button>
          <button onClick={this.update}>更新</button>
          <button onClick={this.delete}>删除</button>
        </div>
        <div id="canvas">

        </div>
      </div>
    )
  }
}