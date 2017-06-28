// Sketch 提供给你的如下功能
// - document model 和 layer tree
// - 与用户交互的实用工具

// ## Imports

import { WrappedObject } from './WrappedObject'

export class Application extends WrappedObject {
  constructor(content) {
    super(content)
  }
}