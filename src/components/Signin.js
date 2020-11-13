import React, { Component } from "react";
// import {Link} from 'react-router-dom'
import { withRouter } from "react-router-dom";
import { Card, Form, Button } from "semantic-ui-react";

class Signin extends Component {
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

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: this.state.username,
    };
    this.props.submitUser(user);
    this.props.history.push(`/question`);
    this.setState({ username: "" });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.props.history.push("/create-account");
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
          // onClick={this.props.handleChoice}
        >
          <Card.Content>
            <Card.Description>
              <h1>Sign In</h1>
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
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  color="violet"
                  value="Create Account"
                  onClick={this.handleCreateClick}
                >
                  Create Account
                </Button>
              </Form>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
export default withRouter(Signin);
