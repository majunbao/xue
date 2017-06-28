// react 组件需要包装成jquery组件那样的api
// 所以这里_Cricle是使用react来写，而Circle采用jquery的api进行包装

import { h, render, Component } from 'preact';
import Store from './Store';

// 图形 圆形
class _Cricle extends Component {

  //@overrider
  setProps(props) {
    Object.assign(this.props, props);
  }

  componentWillUnmount() {
    console.log('Component WILL UNMOUNT!');
  }

  destroy() {
    this.props = null;
    this.setState();
  }

  render() {
    if (!this.props) {
      return null;
    }
    return (<h1 onClick={this.handleClick}>{this.props.text}</h1>)
  }

  handleClick = () => {
    alert(3);
  }

}

export default class Circle {

  constructor(data) {
    if (data) {
      this.setState(data);
    }
  }

  //存储
  data = {
    text: '大圆形'
  }

  cricleInstance = null;

  getData() {
    return data;
  }

  setData(newData) {
    for (let key in newData) {
      this.data[key] = newData[key];
    }
  }

  getReactInstance() {
    return this.cricleInstance;
  }

  render() {
    render(<_Cricle ref={e => this.cricleInstance = e} {...this.data} />, document.getElementById('canvas'));
  }

  reRender() {
    this.getReactInstance().setProps(this.data);//原生没有实现?
    this.getReactInstance().setState();
  }

  update(data) {
    this.setData(data);
    this.reRender();
  }

  destroy() {
    this.cricleInstance.destroy();
  }

}