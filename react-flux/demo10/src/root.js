import {h, render, Component, cloneElement} from 'preact';


class Clock extends Component {
    // constructor() {
    //     super();
    //     // set initial time:
    //     this.state.time = Date.now();
    //     this.d = this.d.bind(this)
    // }
    state = {
      time: "blue"
    }

    d = () => {
      this.setState({
        time: 'red'
      })
    }

    render(props, state) {
        // return <span>{ this.state.time }<a onCLick={this.d}> sdf</a></span>;
        return cloneElement(<div>sss</div>, {
          style:{
            color: state.time
          },
          onMouseDown: this.d
        });
    }
}

class T extends Component {
  render(){
    return <div>sdf</div>

  }
}
render(<Clock><div>sdf</div></Clock>, document.body)