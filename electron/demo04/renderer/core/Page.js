// ## Imports

import { Layer } from './Layer.js'

export class Page extends Layer {
  constructor() {
    super()
  }

  isPage() {
    return false
  }
}