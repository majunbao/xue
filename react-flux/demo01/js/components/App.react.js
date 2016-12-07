import React from 'react';
import {Button, Icon, Select, Text} from './UIKit';


function App(){
  return (
    <div>
      <Button primary>保存</Button>
      <Button success>导出</Button>
      <Select />
      <Button primary sm>预览</Button>

      <div>
        <Button primary>文字</Button>
        <Button success>形状</Button>
        <Select />
        <Button primary sm>预览</Button>
      </div>
    </div>

  )
}

export default App;