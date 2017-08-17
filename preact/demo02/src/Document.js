import { Header } from './Header';
import { Footer } from './Footer'
import { Canvas } from './Canvas'
import { Attr } from './Attr'
import { Nav } from './Nav'


let config = {

}

export class Document {
  constructor() {
    this.docEle = `
      <div>文档</div>
    `
    this.render()
  }
  render() {
    const header = new Header()
    const canvas = new Canvas()
  }
}