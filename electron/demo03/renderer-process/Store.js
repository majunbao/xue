// 存储类

class Store {
  // 实例对象
  _elementList = [];

  // 公共成员
  length = () => {
    return this._elementList.length;
  }

  // 添加元素
  add = (ele) => {
    this._elementList.push(ele);

    console.log(this._elementList);
  }

  getElementList = () => {
    return this._elementList;
  }

  get = (index) => {
    return this._elementList[index];
  }

  // 删除元素
  remove = (id) => {
    for (let i in this._elementList) {
      let tempData = this._elementList[i];
      if (tempData.id === id) {
        this._elementList.splice(i, 1);
      }
    }
  }

  removeForIndex = (index) => {
    this._elementList.splice(index, 1);
  }

}

export default new Store();