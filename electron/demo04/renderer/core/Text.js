// ## Imports

import { Layer } from './Layer'

export class Text extends Layer {
  constructor() {
    super()
  }

  get isText() {
    return true
  }
}