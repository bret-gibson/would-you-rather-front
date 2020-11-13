import React, { Component } from "react";

export default class ProfileAnswer extends Component {
  getAnswerText = () => {
    let answerText = "";
    const currentQuestion = this.props.questions.find((question) => {
      return question.id === this.props.answer.question_id;
    });
    if (currentQuestion.first_option === this.props.answer.choice) {
      answerText = `Would rather ${currentQuestion.first_option} than ${currentQuestion.second_option}.`;
    } else if (currentQuestion.second_option === this.props.answer.choice) {
      answerText = `Would rather ${currentQuestion.second_option} than ${currentQuestion.first_option}.`;
    } else {
      answerText = "Error";
    }
    return answerText;
  };

  style = {
    color: "white",
    paddingLeft: "50px",
  };

  render() {
    return (
      <div style={this.style}>
        {this.props.filter === "My Answers" ? (
          <h3>{this.getAnswerText()}</h3>
        ) : (
          <div></div>
        )}
        <br />
      </div>
    );
  }
}
