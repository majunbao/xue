import { Action } from './Action'

export class Header {
  constructor() {
    this.render()
  }

  bin() {
    $('#header').on('click', 'button', function () {
      Action.addRect()
    })
  }

  add() {

  }

  render() {
    let dom = `
      <div id="header">
        <button>add</button>
      </div>
    `
    $('body').append(dom);
    this.bin()
  }
}