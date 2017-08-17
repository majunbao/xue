import { Msg } from "./Msg"

export const ActionType = {
  ADD_RECT: "ADD_RECT"
}


export const Action = {
  addRect() {
    Msg.emit(ActionType.ADD_RECT, "abc")
  }
}
