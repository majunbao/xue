import React from 'react';

class AppLayout extends React.Component {
  contructor(props) {
    supper(props);
  }

  componentDidMount(){
    let header,section,article;
    console.log(React.Children.toArray(this.props.children))
    console.log(React.Children.only(this.props.children[0]))
    React.Children.forEach(this.props.children, children => {
      if(children.type.name=="Navigator"){
        
      }
    })
  }

  render(){
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}
class LayoutLeft extends React.Component {}
class LayoutRight extends React.Component {}
class LayoutTop extends React.Component {}
class LayoutCenter extends React.Component {}

export default AppLayout;