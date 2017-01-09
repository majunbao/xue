import {h, render, Component, cloneElement} from 'preact';
import Header from './Header';
import Canvas from './Canvas';
import LayoutTop from './LayoutTop';
import LayoutLeft from './LayoutLeft';
import LayoutRight from './LayoutRight';
import LayoutCenter from './LayoutCenter';
import LayoutMain from './LayoutMain';
import LayoutStore from '../stores/LayoutStore';

class Layout extends Component {
  style = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  componentDidMount() {
    LayoutStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    LayoutStore.removeChangeListener(this._onChange)
  }

  render(props, {style = LayoutStore.getStore()}) {
    return (
      <div className="uk-view" style={{...this.style, ...{minHeight: style.minHeight}}}>
        <LayoutTop style={{height: style.top}}><Header /></LayoutTop>
        <LayoutLeft style={{width: style.left, top: style.top}}><div>left</div></LayoutLeft>
        <LayoutCenter style={{left: style.left, top: style.top, right: style.right}}>
          <LayoutMain>
            <Canvas />
          </LayoutMain>
        </LayoutCenter>
        <LayoutRight style={{width: style.right, top: style.top}}></LayoutRight>
      </div>
    )
  }

  _onChange = () => {
    this.setState(LayoutStore.getStore());
  }
}

export default Layout;