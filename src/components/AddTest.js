import React, { Component } from 'react';

class AddTest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: 'test description',
      name: 'test name',
    };
  }

  handleSubmit(event) {
    this.addTest().then(() => {
      this.props.update();
    });
    console.log(event);
    event.preventDefault();
  }

  addTest() {
    const { name, description } = this.state;
    const { testId }            = this.props;

    if (!name || !description) return;
    return fetch('http://localhost:8080/test/add', {
      method: 'POST',
      body: JSON.stringify({ name })
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
        <input type="submit" value="Save" />
      </form>
    );
  }
}

export default AddTest;
