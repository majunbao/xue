import Inferno from 'inferno';

const message = "Hello world";

Inferno.render(
  <div>message={message}</div>,
  document.getElementById("root")
);