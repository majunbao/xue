import {h, cloneElement} from 'preact';

function Event(props) {
  return (
    cloneElement(props.children[0],props)
  )
}

export default Event;