import { h, render, Component } from 'preact';

import Drag, {DragGroup} from "./drag";

function Test(){
  return (
    <div>
      <DragGroup />
    </div>
  )
}

render(<Test />, document.getElementById('root'));