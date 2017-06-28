const History = require('../History')

let his = new History;

function demo() {
  his.max = 10
  his.pushState({ a: 2 })
  his.pushState({ d: 3 })
  his.pushState({ d: 4 })
  his.pushState({ d: 6 })
  his.pushState({ d: 7 })
  his.pushState({ d: 8 })
  his.back()
  his.back()
  his.back()
  his.pushState({ a: 2 })
}

module.exports = demo()