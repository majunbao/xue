/**
 * 历史记录 - history
 * 
 * @author Ma Junbao <mlive@live.cn>
 * @date 2017-5-18
 * 
 * insert()     |     在当前位置后插入新历史记录
 * index()      |     获取当前位置
 * back()       |     将当前位置后移一位
 * next()       |     将当前位置前移一位
 * go()         |     将历史记录移动到指定位置
 * 
 * change       |     历史记录方式变化是触发此事件
 */

export default class History {
  store = [];
  size = 0;
  pos = -1; // 默认数组为空，位置为-1

  insert = (history) => {
    let insertPos = pos;
    this.store.splice(insertPosm, 0, history);
    this.size++;
    this.pos++; // 指向新历史记录
  }

  index = () => {
    return this.pos;
  }

  back = () => {
    if (this.pos > 0) {
      this.pos--;
    }
  }

  next = () => {
    if (this.pos < this.size - 1) {
      this.pos++
    }
  }

  go = (position) => {
    this.pos = position;
  }

  get = () => {
    return this.store[this.pos];
  }
}
