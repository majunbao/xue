import List from './List';

let list = new List();
list.append(2);
list.append(3);
list.append(5);
list.remove(3);

console.log(list.toString());