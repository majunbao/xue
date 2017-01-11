import {h} from 'preact';

const style = {
  bottom: 0,
  left: 0,
  background: '#aaacb9'
}
  
function Left(props) {
  return (
    <div className="uk-view" style={{...style, width: props.layout.left, top: props.layout.top}}>Left</div>
  )
}

export default Left;