// ## Imports

import { WrappedObject } from './WrappedObject'
import { Page } from './Page'

export class Document extends WrappedObject {
  constructor() {
    super()
  }

  selectedPage() {
    return new Page
  }
}