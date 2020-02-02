import React, { Component } from 'react';

class AddStep extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: 'test description',
      name: 'test name',
    };
  }

  handleSubmit(event) {
    this.addStep();
    console.log(event);
    event.preventDefault();
  }

  addStep() {
    const { name, description } = this.state;
    const { testId }            = this.props;

    if (!name || !description) return;
    return fetch('http://localhost:8080/step/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description, testId })
    });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { name, description } = this.state;
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={(e) => this.handleInputChange(e)} />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            onChange={(e) => this.handleInputChange(e)} />
        </label>
        <input type="submit" value="Save" />
      </form>
    );
  }
}

export default AddStep;
