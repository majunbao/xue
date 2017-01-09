import {h, cloneElement} from 'preact';

const LayoutCenter = ({children, ...props}) => {
  let style = {
    top: '60px',
    right: '270px',
    bottom: 0,
    left: '200px',
    background: '#57585D'
  }
  
  return <div className="uk-view" style={{...style, ...props.style}}>{children}</div>
}

export default LayoutCenter;