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
    this.update();
  }

  update() {
    this.askForData()
      .then(r => {
        if (!r)
          return r;
        this.setState({ items: r });
      });
  }

  askForData(id) {
    return fetch('http://localhost:8080/test/all')
      .then(r => r.json())
      .then(r => r.map(x => x.value));
  }

  handleStop(id) {
    return fetch('http://localhost:8080/test/stop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(this.update());
  }

  handleStart(id) {
    return fetch('http://localhost:8080/test/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(this.update());
  }

  renderItem(item) {
    const { name, description, id, status } = item;
    const href                              = `./test/${id}`;
    return (
      <div key={id}>
        <a href={href}>
          TestItem name: <em>{name}</em> description <em>{description}</em> status <em>{status}</em>
        </a>

        <button onClick={e => this.handleStop(id)}>stop</button>
        <button onClick={e => this.handleStart(id)}>start</button>
      </div>
    );
  }

  render() {
    const { items } = this.state;
    return (<div>
        {items.map(x => this.renderItem(x))}
        <AddTest update={this.update.bind(this)} />
      </div>
    );
  }
}

export default Tests;
