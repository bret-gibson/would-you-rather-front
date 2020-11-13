import React, { Component } from "react";
import CommentForm from "./CommentForm";
import { Button } from "semantic-ui-react";

export default class Comment extends Component {
  constructor() {
    super();
    this.state = {
      updateToggle: false,
      commentUser: "",
    };
  }

  handleToggle = (event) => {
    this.setState({ updateToggle: !this.state.updateToggle });
  };

  componentDidMount() {
    //  fetch("http://localhost:3000/users")
    fetch("https://ancient-cliffs-69900.herokuapp.com/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (user) => user.id === this.props.comment.user_id
        );
        this.setState({ commentUser: user.username });
      });
  }

  render() {
    if (this.props.userData.id === this.props.comment.user_id) {
      return (
        <div>
          <h4>{this.state.commentUser} says:</h4>
          <p>{this.props.comment.comment_text}</p>
          <Button
            color="violet"
            size="mini"
            id={this.props.comment.id}
            onClick={this.props.handleDelete}
          >
            Delete
          </Button>
          <Button
            color="violet"
            size="mini"
            id={this.props.comment.id}
            onClick={this.handleToggle}
          >
            Edit
          </Button>
          <br />
          <br />
          <br />
          {this.state.updateToggle === true ? (
            <CommentForm
              comment={this.props.comment}
              userData={this.props.userData}
              question={this.props.question}
              updateToggle={true}
            />
          ) : null}
        </div>
      );
    } else {
      return (
        <div>
          <h4>{this.state.commentUser} says:</h4>
          <p>{this.props.comment.comment_text}</p>
          <br />
        </div>
      );
    }
  }
}
