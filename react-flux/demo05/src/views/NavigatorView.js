import React from 'react';
import {DraggableCore} from 'react-draggable';

class NavigatorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NavigatorNode: [
        {
          id: 1,
          content: '11111'
        },
        {
          id: 2,
          content: '22222'
        },
        {
          id: 3,
          content: '33333'
        }
      ]
    },
    this.onDrag = this.onDrag.bind(this);
  }

  onDrag(event, data) {
    
  }

  onStart(event, data, id) {
    console.log(id);
  }

  render() {
    return (
      <svg height="100%">
        {
          this.state.NavigatorNode.map( (item, i) => {
            return <DraggableCore key={i} onDrag={this.onDrag} onStart={(e,d) => {this.onStart(e,d,item.id), 100}}>
              <svg y={(item.id-1)*100}>
                <g>
                  <rect x="1" y="1" width="100" height="100" fill="#fff" stroke="blue" strokeWidth="1" />
                  <text x="0" y="1em">{item.content}</text>
                </g>
              </svg>
            </DraggableCore>
          })
        }
      </svg>
    )
  }
}

export default NavigatorView;