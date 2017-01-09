import {h, cloneElement} from 'preact';

const LayoutLeft = ({children, ...props}) => {
  let style = {
    bottom: 0,
    left: 0,
    background: '#aaacb9'
  }

  return (cloneElement(children[0], {
    className: 'uk-view',
    style: {...style, ...props.style}
  }))
}

export default LayoutLeft;