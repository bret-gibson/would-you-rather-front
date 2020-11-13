import React, { Component } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

export default class CommentContainer extends Component {
  constructor() {
    super();
    this.state = {
      comments: null,
      updateToggle: false,
    };
  }

  componentDidMount() {
    fetch(
      `https://ancient-cliffs-69900.herokuapp.com/questions/${this.props.question.id}`
    )
      .then((response) => response.json())
      .then((question) => {
        this.setState({ comments: question.comments });
      });
  }

  handleToggle = (event) => {
    this.setState({ updateToggle: !this.state.updateToggle });
  };

  doSubmit = (comment) => {
    const newCommentObj = {
      user_id: this.props.userData.id,
      question_id: this.props.question.id,
      comment_text: comment,
    };
    // fetch("http://localhost:3000/comments", {
    fetch("https://ancient-cliffs-69900.herokuapp.com/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentObj),
    })
      // .then(fetch(`http://localhost:3000/questions/${this.props.question.id}`))
      //   .then((response) => response.json())
      //   .then((question) => {
      //     debugger;
      //     this.setState({ comments: question.comments });
      //   });
      .then((response) => {
        response.json();
      })
      .then((newComment) => {
        debugger;
        console.log(newComment);
        const newComments = this.state.comments.push(newComment);
        this.setState({
          comments: newComments,
        });
      });
  };

  //   doSubmit = (comment) => {
  //     const newCommentObj = {
  //       user_id: this.props.userData.id,
  //       question_id: this.props.question.id,
  //       comment_text: comment,
  //     };
  //     fetch(`http://localhost:3000/comments`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newCommentObj),
  //     });
  //   };

  //   handleChange = (event) => {
  //     const value = event.target.value;
  //     const name = event.target.name;
  //     this.setState({
  //       [name]: value,
  //     });
  //   };

  //   handleSubmit = (event) => {
  //     event.preventDefault();
  //     this.props.doSubmit(this.state.comment);
  //     this.setState({
  //       comment: "",
  //     });
  //   };

  //   handleUpdate = (commentText) => {
  //     event.preventDefault();
  //     const newCommentObj = {
  //       user_id: this.props.userData.id,
  //       question_id: this.props.question.id,
  //       comment_text: commentText,
  //     };
  //     fetch(`http://localhost:3000/comments/${this.props.comment.id}`, {
  //       // fetch(
  //       //   `https://ancient-cliffs-69900.herokuapp.com/comments/${this.props.comment.id}`,
  //       //   {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newCommentObj),
  //     });
  //     this.setState({
  //       comment: "",
  //     });
  //   };

  containerStyle = {
    paddingLeft: "50px",
    color: "white",
  };

  render() {
    if (this.props.question.comments) {
      return (
        <div style={this.containerStyle}>
          <h2>Comments</h2>
          {this.props.question.comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                userData={this.props.userData}
                question={this.props.question}
                handleDelete={this.props.handleDelete}
              />
            );
          })}
          <br></br>
          <CommentForm
            size={"large"}
            // handleSubmit={this.handleSubmit}
            // handleDelete={this.handleDelete}
            // handleChange={this.handleChange}
            doSubmit={this.doSubmit}
            question={this.props.question}
            userData={this.props.userData}
            updateToggle={this.state.updateToggle}
            handleToggle={this.handleToggle}
          />
        </div>
      );
    } else {
      return <h1 style={this.containerStyle}>Loading Comments</h1>;
    }
  }
}
