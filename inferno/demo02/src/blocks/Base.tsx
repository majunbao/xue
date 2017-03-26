import Inferno from 'inferno';
import Component from 'inferno-component';

export default class Base extends Component<Object, Object> {
  test: string;
  constructor(props) {
    super(props);
    this.test = "nihao";
  }
}