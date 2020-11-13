import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Button } from "semantic-ui-react";

export default class SubmitQuestionForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      first_option: "",
      second_option: "",
      context: "",
      submittedUserId: "",
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
    alert("Your question has been submitted.");
    const newQuestionObj = {
      title: this.state.title,
      first_option: this.state.first_option,
      second_option: this.state.second_option,
      context: this.state.context,
      submittedUserId: this.props.userData.id,
    };
    // fetch("http://localhost:3000/questions"

    fetch("https://bg-would-you-rather-backend.herokuapp.com/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestionObj),
    });
    this.setState({
      title: "",
      first_option: "",
      second_option: "",
      context: "",
      submittedUserId: "",
    });
  };

  cardStyle = {
    paddingLeft: "30px",
  };

  formStyle = {
    paddingLeft: "20px",
    paddingRight: "20px",
  };

  formButtonStyle = {
    paddingRight: "20px",
    paddingLeft: "20px",
    marginBottom: "10px",
  };

  render() {
    return (
      <div style={this.cardStyle}>
        <Link to="/question">
          <Button color="violet">Back to questions</Button>
        </Link>
        <Card style={this.formStyle}>
          <Card.Content header>
            <b>Make Your Own Question!</b>
          </Card.Content>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder="Title"
                name="title"
                type="text"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </Form.Field>

            <Form.Field>
              <label>Option #1</label>
              <input
                placeholder="Option #1"
                name="first_option"
                type="text"
                onChange={this.handleChange}
                value={this.state.first_option}
              />
            </Form.Field>

            <Form.Field>
              <label>Option #2</label>
              <input
                placeholder="Option #2"
                name="second_option"
                type="text"
                onChange={this.handleChange}
                value={this.state.second_option}
              />
            </Form.Field>

            <Form.Field>
              <label>Context</label>
              <input
                placeholder="Context"
                name="context"
                type="text"
                onChange={this.handleChange}
                value={this.state.context}
              />
            </Form.Field>

            <Button
              color="violet"
              style={this.formButtonStyle}
              size="mini"
              type="submit"
              value="Submit Question"
              onClick={this.handleSubmit}
            >
              Submit Question
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}
