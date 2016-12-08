import React from 'react';

class Navigator extends React.Component {
  render(){
    return(
      <div className="app-navigator">
        <NavigatorThumbnail />
        <NavigatorThumbnail />
        <NavigatorThumbnail />
      </div>
    )
  }
}

class NavigatorThumbnail extends React.Component {
  render(){
    return(
      <div>
        <img src="images/5add5025e64f20a036ce1b6af3add92ecbf92693.jpeg" />
      </div>
    )
  }
}

export default Navigator;