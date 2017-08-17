import { Msg } from './Msg'
import { ActionType } from './Action'

export class Canvas {
  constructor() {
    this.render()
  }
  render() {
    $('body').append('<div class="canvas1"></div>')
    this.bind()
  }
  bind() {
    Msg.on(ActionType.ADD_RECT, function () {
      console.log('Canvas')
    })
  }
}