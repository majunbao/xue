// 所有对象的基类

export class WrappedObject {
  constructor(object) {
    this._id = Math.random().toFixed(5).replace('0.', 'id-')
  }

  get id() {
    return this._id
  }
}