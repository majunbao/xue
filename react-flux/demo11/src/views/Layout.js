import {h, render, Component, cloneElement} from 'preact';
import Canvas from './Canvas';

class Layout extends Component {
  state = {
    top: this.props.style.top,
    left: this.props.style.left,
    right: this.props.style.right,
    minHeight: this.props.style.minHeight
  }

  style = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  Test = () => {
    this.setState({
      top: '10px',
      left: '100px'
    })
  }
  Test1 = () => {
    this.setState({
      top: '20px',
      right: '200px'
    })
  }

  render(props, state) {
    return (
      <div className="uk-view" style={{...this.style, ...{minHeight: this.state.minHeight}}}>
        <Top style={{height: state.top}}><div>t2op</div></Top>
        <Left style={{width: state.left, top: state.top}}><div>left</div></Left>
        <Center style={{left: state.left, top: state.top, right: state.right}}>
          <Main>
            <Canvas></Canvas>
          </Main>
        </Center>
        <Right style={{width: state.right, top: state.top}}>
          <div>
            <button onClick={this.Test}>1</button>
            <button onClick={this.Test1}>2</button>
          </div>
        </Right>
      </div>
    )
  }
}

class Top extends Component {
  style = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: '#242424'
  }

  render(props, state) {
    return (cloneElement(props.children[0], {
      className: 'uk-view',
      style: {...this.style, ...props.style}
    }))
  }
}

class Left extends Component {
  style = {
    bottom: 0,
    left: 0,
    background: '#aaacb9'
  }

  render(props, state) {
    return (cloneElement(props.children[0], {
      className: 'uk-view',
      style: {...this.style, ...props.style}
    }))
  }
}

class Right extends Component {
  style = {
    top: '60px',
    right: 0,
    bottom: 0,
    background: '#F6F6F6'
  }

  render(props, state) {
    return (cloneElement(props.children[0], {
      className: 'uk-view',
      style: {...this.style, ...props.style}
    }))
  }
}

class Center extends Component {
  state = {
    top: '60px',
    right: '270px',
    bottom: 0,
    left: '200px',
    background: '#57585D'
  }

  render(props, state) {
    return <div className="uk-view" style={{...state, ...props.style}}>{props.children}</div>
  }
}

class Main extends Component {
  style = {
    width: '768px',
    height: '576px',
    top: '50%',
    left: '50%',
    overflow: 'visible',
    background: '#fff',
    marginTop: '-288px',
    marginLeft: '-383.5px'
  }

  render(props, state) {
    return <div className="uk-view" style={{...this.style, ...props.style}}>{props.children}</div>
  }
}

export default Layout;