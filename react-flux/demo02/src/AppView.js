import React from 'react';
import AppActions from './AppActions';

function AppView(props){
  const onChange = (e) => props.onUpdateDraft(e.target.value);
  const onClick = (e) => props.onAdd(props.lists.draft);
  return(
    <div>
      <input onChange={onChange} />
      <button onClick={onClick}>add</button>
      <br />{props.draft}
      <NumberList number={props.numberList} />
    </div>
  )
}

function NumberList(props) {
  const numbers = props.number;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}


export default AppView;