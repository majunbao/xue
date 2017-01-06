import {h, render, Component, cloneElement} from 'preact';
import Header from './Header';
import Canvas from './Canvas';
import LayoutTop from './LayoutTop';
import LayoutLeft from './LayoutLeft';
import LayoutRight from './LayoutRight';
import LayoutCenter from './LayoutCenter';
import LayoutMain from './LayoutMain';

class Layout extends Component {
  style = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  render(props, state) {
    return (
      <div className="uk-view" style={{...this.style, ...{minHeight: props.minHeight}}}>
        <LayoutTop style={{height: props.top}}><Header /></LayoutTop>
        <LayoutLeft style={{width: props.left, top: props.top}}><div>left</div></LayoutLeft>
        <LayoutCenter style={{left: props.left, top: props.top, right: props.right}}>
          <LayoutMain>
            <Canvas></Canvas>
          </LayoutMain>
        </LayoutCenter>
        <LayoutRight style={{width: props.right, top: props.top}}></LayoutRight>
      </div>
    )
  }
}

export default Layout;