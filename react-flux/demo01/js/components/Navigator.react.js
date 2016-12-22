import React from 'react';

class Navigator extends React.Component {
  render(){
    return(
      <div className="app-navigator">
        <NavigatorThumbnail />
        <NavigatorThumbnail />
      </div>
    )
  }
}

class NavigatorThumbnail extends React.Component {
  render(){
    return(
      <div className="navigator-item">
        <img src="images/preview-nav.png" />
      </div>
    )
  }
}

export default Navigator;