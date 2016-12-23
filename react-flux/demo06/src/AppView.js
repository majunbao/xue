import React from 'react';

function AppView(props){
  return (
    <div>
      <h1 draggable="true" >AppView</h1>
      <button draggable="true"  onClick={(e) => {props.onStopDrag(2)}}>{props.draging.toString()}</button>
    </div>
  )
}

export default AppView;