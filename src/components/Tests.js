import React, { PureComponent } from 'react';
import AddTest from './AddTest';

class Tests extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.askForData()
      .then(r => {
        console.log(r);
        this.setState({ items: r });
      });
  }

  askForData(id) {
    return fetch('http://localhost:8080/test/all')
      .then(r => r.json())
      .then(r => r.map(x => x.value));
  }

  stop(id) {
    return fetch('http://localhost:8080/test/stop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
  }

  renderItem(item, key) {
    const { name, description, id } = item;
    const href                      = `./test/${id}`;
    return (
      <div key={key}>
        <a href={href}>
          TestItem name: <em>{name}</em> description <em>{description}</em>
        </a>

        <button onClick={e => this.stop(id)}>x</button>
      </div>
    );
  }

  render() {
    const { items } = this.state;
    return (<div>
        {items.map(this.renderItem)}
        <AddTest />
      </div>
    );
  }
}

export default Tests;
