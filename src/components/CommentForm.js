import React, { Component } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";

export default class CommentForm extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
    };
  }

  componentDidMount() {
    if (this.props.updateToggle === true) {
      this.setState({ comment: this.props.comment.comment_text });
    }
  }

  // doSubmit = (comment) => {
  //   const newCommentObj = {
  //     user_id: this.props.userData.id,
  //     question_id: this.props.question.id,
  //     comment_text: comment,
  //   };
  //   fetch(`http://localhost:3000/comments`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newCommentObj),
  //   });
  // };

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.doSubmit(this.state.comment);
    this.setState({
      comment: "",
    });
  };

  // handleUpdate = (event) => {
  //   event.preventDefault();
  //   const newCommentObj = {
  //     user_id: this.props.userData.id,
  //     question_id: this.props.question.id,
  //     comment_text: this.state.comment,
  //   };
  //   fetch(`http://localhost:3000/comments/${this.props.comment.id}`, {
  //     // fetch(
  //     //   `https://ancient-cliffs-69900.herokuapp.com/comments/${this.props.comment.id}`,
  //     //   {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newCommentObj),
  //   });
  //   this.setState({
  //     comment: "",
  //   });
  // };

  style = {
    width: "30%",
  };

  render() {
    if (this.props.updateToggle === true) {
      return (
        <div>
          <Form>
            <Form.Field style={this.style}>
              <TextArea
                name="comment"
                type="textarea"
                onChange={this.handleChange}
                value={this.state.comment}
              />
              {/* <input name='comment' type='textarea' onChange={this.handleChange} value={this.state.comment} /> */}
            </Form.Field>
            <Button
              color="violet"
              size="mini"
              type="submit"
              value="Update Comment"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Form>
          <br />
        </div>
      );
    } else {
      return (
        <div>
          <h4>Submit a Comment:</h4>
          <Form size={this.props.size}>
            <Form.Field style={this.style}>
              <TextArea
                name="comment"
                type="textarea"
                onChange={this.handleChange}
                value={this.state.comment}
              />
              {/* <input placeholder='Comment' name='comment' type='textarea' onChange={this.handleChange} value={this.state.comment} /> */}
            </Form.Field>
            <Button
              color="violet"
              size="mini"
              type="submit"
              value="Submit Comment"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Form>
          <br />
        </div>
      );
    }
  }
}
