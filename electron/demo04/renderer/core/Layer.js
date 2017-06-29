// ## Imports

import { WrappedObject } from './WrappedObject'

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
    $('#renderer').append('<div>nihao</div>')
  }
  newGroup(properties) { }
  newArtboard(properties) { }
  newImage(properties) { }

  remove() { }

  select() { }

  deselect() { }

  addToSelection() { }

  iterate(block) { }

}