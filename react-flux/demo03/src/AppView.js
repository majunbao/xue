import React from 'react';

function Hello(props) {
  return(
    <div onClick={props.onTest}>Test{props.value}</div>
  )
}

export default Hello;