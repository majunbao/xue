const React = require('react')
const ReactDOM = require('react-dom')

import { Application } from './core/Application'

function main() {
  let app = new Application

  let doc = app.selectedDocument()
  let page = doc.selectedPage()

  let text = page.newText({
    text: 'Hello',
    frame: { x: 0, y: 0, width: 100, height: 100 }
  })

  let text2 = page.newText({
    text: 'Hello',
    frame: { x: 0, y: 0, width: 100, height: 100 }
  })
}

// jQuery 和 React 渲染开始
$(main)
ReactDOM.render(<h1>ni2ha3o</h1>, document.getElementById('renderer'))