// ## Imports

import { WrappedObject } from './WrappedObject'
// import { Text } from './Text'
import { MSText } from './MSText'

export class Layer extends WrappedObject {
  constructor() {
    super()
  }

  get name() { }
  set name(value) { }

  get frame() { }
  set frame(value) { }

  duplicate() { }

  get isPage() { return false; }
  get isArtboard() { return false; }
  get isGroup() { return false; }
  get isText() { return false; }
  get isShape() { return false; }
  get isImage() { return false; }

  newShape(properties) { }
  newText(properties) {
    let newLayer = new MSText
    $('#renderer').append(newLayer.dom)

    return newLayer
  }
  newGroup(properties) {


  }
  newArtboard(properties) { }
  newImage(properties) { }

  remove() {
    // @TODO 循环图层内元素，依次删除，若是分组，调用分组删除方法
    this.destroy()
  }

  select() { }

  deselect() { }

  addToSelection() { }

  iterate(block) { }

}