import React from 'react';

class Toolbar extends React.Component {
  render() {
    return(
      <div className="app-toolbar align-justify" key="Toolbar">
        <ToolbarButtonGroup>
          <ToolbarButton />
          <ToolbarButton />
          <ToolbarSelect />
          <ToolbarButton />
        </ToolbarButtonGroup>

        {" "}

        <ToolbarButtonGroup>
          <ToolbarTool />
          <ToolbarTool />
          <ToolbarTool />
          <ToolbarTool />
          <ToolbarTool />
          <ToolbarTool />
          <ToolbarTool />
          <ToolbarTool />
        </ToolbarButtonGroup>

        {" "}

        <ToolbarButtonGroup>
          <ToolbarButton />
          <ToolbarButton />
          <ToolbarButton />
          <ToolbarButton />
        </ToolbarButtonGroup>
      </div>
    )
  }
}

// 一组工具
class ToolbarButtonGroup extends React.Component {
  render() {
    return(
      <div className="inline">
        {this.props.children}
      </div>
    )
  }
}

// 工具栏 按钮
class ToolbarButton extends React.Component {
  render() {
    return(
      <div className="inline">
        <button>xxx</button><br />
        <span>导出</span>
      </div>
    )
  }
}

// 工具栏 select
class ToolbarSelect extends React.Component {
  render() {
    return(
      <div className="inline">
        <select>
          <option>25%</option>
          <option>50%</option>
          <option>75%</option>
          <option>100%</option>
          <option>125%</option>
          <option>150%</option>
          <option>200%</option>
          <option>300%</option>
          <option>400%</option>
          <option>适合窗口</option>
        </select><br />
        <span>导出</span>
      </div>
    )
  }
}

// 工具栏 工具
class ToolbarTool extends React.Component {
  render() {
    return(
      <div className="inline">
        <button>xxx</button><br />
        <span>文字</span>
      </div>
    )
  }
}

export default Toolbar;