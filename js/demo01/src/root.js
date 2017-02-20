class View {
  name = "xiaoma";
  static sayHello = (name) => {
    console.log(View.name)
  }
}

class ButtonView extends View {
  sayHello = () => {
    console.log(View)
  }
}

View.sayHello('nihao');

const button = new ButtonView();

button.sayHello();