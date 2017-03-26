import Inferno from 'inferno';
import Block from './blocks/Base';

class MyComponent extends Block {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
    console.log(this.test);
  }
  render() {
    return (
      <div>
        <h1>Header!</h1>
        <span>Counter is at: {this.state.toString()}</span>
      </div>
    )
  }
}


Inferno.render(<MyComponent />, document.getElementById('root'));