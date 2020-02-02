import React, { PureComponent } from 'react';
import AddStep from './AddStep';

class TestItem extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      steps: [],
      wsData: []
    };
  }

  //ws = new WebSocket('ws://localhost:8080/ws');

  componentDidMount() {
    this.askForData(this.props.match.params.testId).then(res => {
      this.setState({ 'steps': res.steps, name: res.name });
    });
  }

  initWS() {
    this.ws.onopen = () => {
      console.log('connected');
    };

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data);
      const data    = this.state.wsData;
      data.push(message);
      console.log(message);

      this.setState({ wsData: data });
    };

    this.ws.onclose = () => {
      console.log('disconnected');
    };
  }

  askForData(testId) {
    return fetch(`http://localhost:8080/test/${testId}`)
      .then(r => r.json());
  }

  renderItem(item, key) {
    const { name, description, id } = item;
    return (<div key={key}>
      <a href="http://localhost:8080/test/{id}">TestItem
        name: <em>{name}</em> description <em>{description}</em>
      </a>

      <button>x</button>
    </div>);
  }

  render() {
    const { name, steps } = this.state;
    return (<div>
        <h1>TestItem name: <em>{name}</em></h1>
        {steps.map(this.renderItem)}
        <AddStep testId={this.props.match.params.testId} />
      </div>
    );
  }
}

export default TestItem;
