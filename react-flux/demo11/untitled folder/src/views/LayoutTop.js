import {h, cloneElement} from 'preact';

const LayoutTop = ({children, ...props}) => {
  let style = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: '#242424'
  };

  return (
    cloneElement(children[0], {
      className: 'uk-view',
      style: {...style, ...props.style}
    })
  )
}

export default LayoutTop;