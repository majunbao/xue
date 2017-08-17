const React = require('react')
const ReactDOM = require('react-dom')
import { API } from './core/API'

let sketch = context.api

function welcome() {
  $('.new-file').on('click', function () {
    sketch.newDocument()
  })
}
function main() {
  welcome()
  // let doc = app.newDocument()

  // let page = doc.newPage()

  // let text = page.newText({text:'nihao', frame:{x:0,y:0,width:200,height:300}})

  // let doc = app.selectedDocument()
  // let page = doc.selectedPage()

  // let c = page.newText({
  //   text: 'Hello',
  //   frame: { x: 0, y: 0, width: 100, height: 100 }
  // })
  // let c2 = page.newText({
  //   text: 'Hello',
  //   frame: { x: 0, y: 0, width: 100, height: 100 }
  // })

  // let group = page.newGroup({})
  // group.newText({})
  // group.newText({})



}

// jQuery 和 React 渲染开始
$(main)
ReactDOM.render(<h1>ni2ha3o</h1>, document.getElementById('renderer'))