// Sketch 提供给你的如下功能
// - document model 和 layer tree
// - 与用户交互的实用工具

// ## Imports

import { WrappedObject } from './WrappedObject'
import { Document } from './Document'
import { Page } from './Page'
import { Text } from './Text'

export class Application extends WrappedObject {
  constructor(content) {
    super(content)
  }

  newDocument() { }

  selectedDocument() {
    return new Document
  }

  log(message) { }
  message(message) { }
  alert(title, message) { }
}