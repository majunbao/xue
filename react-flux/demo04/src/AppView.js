import React from 'react';
import Draggable from 'react-draggable';

function AppView(props) {
  return (
    <Test {...props} />
  )
}

function Test(props) {
  const items = props.val.map((item, index) => {
    return <Draggable 
      key={index}
      onStop={()=> console.log(2)}
      defaultPosition={{x:50,y:20}}
    ><p>{item.text}</p></Draggable>;
  });
  const id = Math.random();
  return (
    <div>
      <h1>{items}</h1>
      <p><button onClick={function(){props.onTest(id)}}>add</button></p>
      <p><button onClick={function(){props.onSort(id)}}>排序</button></p>
    </div>
  )
}

export default AppView;