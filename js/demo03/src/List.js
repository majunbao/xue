class List {
  constructor() {
    this.listSize = 0;
    this.dataStore = []; // 初始化一个空数组来保存列表元素
  }

  clear () {

  }
  find(element) {
    for (let i = 0; i < this.dataStore.length; i++) {
      if(this.dataStore[i] === element) {
        return i;
      }
    }
    return -1;
  }
  toString() {
    return this.dataStore;
  }
  insert() {}
  append(element) {
    this.dataStore[this.listSize++] = element;
  }
  remove(element) {
    let foundAt = this.find(element);
    if(foundAt > -1) {
      this.dataStore.splice(foundAt, 1);
      this.listSize--;
      return true;
    }
    return false;
  }
  front() {}
  end() {}
  prev() {}
  next() {}
  length() {}
  currPos() {}
  moveTo() {}
  getElement() {}
  length() {
    return this.listSize;
  }
  contains() {}
}

export default List;