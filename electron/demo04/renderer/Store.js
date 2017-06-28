// 存储类

class Store {
  // 实例对象
  constructor() {
    this._elementList = []
  }

  // 属性
  get length() {
    return this._elementList.length
  }

  /**
   * 添加元素
   * @param {eleObject} ele 
   */
  add(ele) {
    this._elementList.push(ele)
  }

  /**
   * 添加所有元素
   * @param {eleArray} eleList 
   */
  addAll(eleList) {
    eleList.forEach(this.add.bind(this))
  }

  /**
   * 获取元素
   * id || index
   * return true||false
   */
  get() { }

  getAll() {
    return this._elementList;
  }

  /**
   * 删除元素
   * id || index
   * return eleObject 被删除的元素
   */
  remove(ele) {
    // 参数是id
    if (typeof ele === 'string') {
      for (let i in this._elementList) {
        let tempData = this._elementList[i];
        if (tempData.id === ele) return this._elementList.splice(i, 1)[0]
      }
    }

    // 参数是index
    if (Number.isInteger(ele)) return this._elementList.splice(ele, 1)[0]

    return undefined
  }

  removeAll() {
    this._elementList = []
  }

  // // 添加元素
  // add = (ele) => {
  //   this._elementList.push(ele);

  //   console.log(this._elementList);
  // }

  // getElementList = () => {
  //   return this._elementList;
  // }

  // get = (index) => {
  //   return this._elementList[index];
  // }

  // getEleById = (id) => {
  //   for (let ele of this._elementList) {
  //     if (ele.getData().id === id) {
  //       return ele;
  //     }
  //   }
  //   return null;
  // }

  // // 删除元素
  // remove = (id) => {
  //   for (let i in this._elementList) {
  //     let tempData = this._elementList[i];
  //     if (tempData.id === id) {
  //       this._elementList.splice(i, 1);
  //     }
  //   }
  // }

  // removeForIndex = (index) => {
  //   this._elementList.splice(index, 1);
  // }

}

module.exports = new Store;