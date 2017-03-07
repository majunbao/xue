import "babel-polyfill"
class Test {
  constructor() {
    console.log(2);
  }
  sayHello() {
    '*'.repeat(102);  
  }
};
document.write('*'.repeat);