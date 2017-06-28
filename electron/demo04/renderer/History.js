/**
 *  历史纪录
interface History {
  readonly length: number;
  readonly state: any;
  scrollRestoration: ScrollRestoration;
  back(): void;
  forward(): void;
  go(delta?: number): void;
  pushState(data: any, title: string, url?: string | null): void;
  replaceState(data: any, title: string, url?: string | null): void;
}
*/


class History {
  constructor() {
    this._pos = -1
    this._state = []
    this._max = 4
  }

  get length() {
    return this._state.length
  }
  get state() {
    return {
      position: this._pos,
      historyState: this._state
    }
  }

  // 可保存的最大历史纪录
  get max() {
    return this._max
  }
  set max(max) {
    this._max = max
  }

  back() {
    if (this._pos > 0)
      this._pos--
  }
  forward() {
    if (this._pos < this._max - 1)
      this._pos++
  }
  go(index) {
    if (!Number.isInteger(index))
      throw new Error('历史纪录的索引必须是整数。')

    if (0 <= index < this._max)
      this._pos = index
  }
  pushState(state) {
    if (!state) return
    // 删除超出的历史纪录
    if (this.length === this._max) {
      this._state.splice(0, 1)
      this._pos--
    }
    // 删除当前位置之后的历史纪录
    this._state.splice(this._pos + 1)
    // 添加历史纪录
    this._state.push(state)
    this._pos++
  }
  replaceState() { }
}

module.exports = History;