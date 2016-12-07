import React from 'react';
import Tool from './Tool.react';

class Header extends React.Component {
  render() {
    return(
      <div className="app-header">
        <Tool>保存</Tool>
        <Tool>导出</Tool>
        <Tool>
          <select defaultValue="coconut">
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </Tool>
        <Tool>预览</Tool>
      </div>
    )
  }
}

export default Header;