import React from 'react';

class AppLayout extends React.Component {
  contructor(props) {
    supper(props);
    this.Toolbar;
    this.Navigator;
    this.Canvas;
    this.Inspector;
  }

  componentWillMount(){
    React.Children.forEach(this.props.children, children => {
      let childrenName = children.type.toString().match(/[A-Z][a-z]*/).toString();
      if(childrenName == 'Toolbar'){
        this.Toolbar = children
      }else if(childrenName == 'Navigator') {
        this.Navigator = children
      }else if(childrenName == 'Canvas') {
        this.Canvas = children
      }else if(childrenName == 'Inspector') {
        this.Inspector = children
      }
    })
  }

  render(){
    return(
      <div className="app-layout">
        <div className="app-layout-top">
          {this.Toolbar}
        </div>
        <div className="app-layout-main">
          <div className="app-layout-left">
            {this.Navigator}
          </div>
          <div className="app-layout-center">
            {this.Canvas}
          </div>
          <div className="app-layout-right">
            {this.Inspector}
          </div>
        </div>
      </div>
    )
  }
}

export default AppLayout;