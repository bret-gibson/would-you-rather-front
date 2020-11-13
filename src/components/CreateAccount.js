import React, { Component } from "react";
// import {Link} from 'react-router-dom'
import { withRouter } from "react-router-dom";
import { Card, Form, Button } from "semantic-ui-react";

class CreateAccount extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleCreate = (event) => {
    event.preventDefault();
    const user = {
      username: this.state.username,
    };
    this.props.createUser(user);
    // this.props.submitUser(user);
    this.props.history.push(`/question`);
    this.setState({ username: "" });
  };

  style = {
    padding: "100px",
  };

  headerStyle = {
    textAlign: "center",
    color: "white",
    paddingBottom: "80px",
    fontSize: "50px",
  };

  render() {
    return (
      <div style={this.style}>
        <h1 style={this.headerStyle}>Welcome to Would You Rather!</h1>
        <Card
          centered={true}
          verticalalign="middle"
          //   onClick={this.props.handleChoice}
        >
          <Card.Content>
            <Card.Description>
              <h1>Create Account</h1>
              <Form>
                <Form.Field>
                  <label>Username</label>
                  <input
                    placeholder="Username"
                    name="username"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.username}
                  />
                </Form.Field>
                <Button
                  color="violet"
                  type="submit"
                  value="Sign In"
                  onClick={this.handleCreate}
                >
                  Create Account and Sign In
                </Button>
              </Form>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
export default withRouter(CreateAccount);
