// ## Imports

import { Layer } from './Layer.js'

export class Page extends Layer {
  constructor() {
    super()
  }

  get isPage() {
    return false
  }
}