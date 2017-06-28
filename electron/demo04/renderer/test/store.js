const Store = require('../Store')

const eleArrty = [
  {
    id: '1',
    d: 123123
  },
  {
    id: '2',
    d: 882
  },
  {
    id: "3",
    d: 8766
  },
  {
    id: '4',
    d: 435345
  }
]

Store.addAll(eleArrty)
console.log(Store.length)
console.log(Store.remove(2))
console.log(Store.remove("1"))
console.log(Store.remove(29))
console.log(Store.remove("29"))
console.log(Store.getAll())