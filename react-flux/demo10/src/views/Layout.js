import {h, render, Component} from 'preact';

class Layout extends Component {
  state = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    minHeight: '550px'
  }

  render(props, state) {
    return (
      <div className="uk-view" style={{...state}}>
        <Top />
        <Left />
        <Center>
          <Canvas />
        </Center>
        <Right />
      </div>
    )
  }
}

class Top extends Component {
  state = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '60px',
    background: '#242424'
  }

  render(props, state) {
    return <div style={{...state}}>nihao</div>
  }
}

class Left extends Component {
  state = {
    top: '60px',
    bottom: 0,
    left: 0,
    background: '#aaacb9',
    width: '200px'
  }

  render(props, state) {
    return <div className="uk-view" style={{...state}}>nihao</div>
  }
}

class Right extends Component {
  state = {
    top: '60px',
    right: 0,
    bottom: 0,
    background: '#F6F6F6',
    width: '270px'
  }

  render(props, state) {
    return <div className="uk-view" style={{...state}}>nihao</div>
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
    return <div className="uk-view" style={{...state}}>{props.children}</div>
  }
}

class Canvas extends Component {
  state = {
    width: '768px',
    height: '576px',
    top: '50%',
    left: '50%',
    background: '#fff',
    marginTop: '-288px',
    marginLeft: '-383.5px'
  }

  render(props, state) {
    return <div className="uk-view" style={{...state}}>nihao</div>
  }
}

export default Layout;