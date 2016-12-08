import React from 'react';
import {Button, Icon, Select, Text, Scroll} from './UXKit';
import Toolbar from './Toolbar.react';
import Navigator from './Navigator.react';
import Canvas from './Canvas.react';
import Inspector from './Inspector.react';
import AppLayout from './AppLayout.react';

function App(){
  return (
    <AppLayout>
      <Toolbar />
      <Navigator />
      <Canvas />
      <Inspector />
    </AppLayout>
  )
}

export default App;