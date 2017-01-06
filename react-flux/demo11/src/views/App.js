import {h, render, Component} from 'preact';
import Layout from './Layout';
import LayoutStore from '../stores/LayoutStore';


class App extends Component {
  componentDidMount() {
    LayoutStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    LayoutStore.removeChangeListener(this._onChange)
  }

  render(props, {layoutStyle = LayoutStore.getLayout()}) {
    return (
      <Layout {...layoutStyle} />
    )
  }

  _onChange = () => {
    this.setState(LayoutStore.getLayout());
  }
}

export default App;