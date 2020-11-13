import React, { Component } from "react";
import ProfileAnswer from "./ProfileAnswer";
import ProfileQuestion from "./ProfileQuestion";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

export default class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      userAnswers: [],
      userQuestions: [],
      associatedQuestions: [],
      filter: "My Answers",
    };
  }

  componentDidMount() {
    // fetch(`http://localhost:3000/users/${this.props.userData.id}/login`)
    fetch(
      `https://ancient-cliffs-69900.herokuapp.com/users/${this.props.userData.id}/login`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          userAnswers: data.user_questions,
          userQuestions: data.submitted_questions,
          associatedQuestions: data.questions,
        });
      });
  }

  handleFilter = (event) => {
    this.setState({ filter: event.target.textContent });
  };

  render() {
    return (
      <div>
        <Link to="/question">
          <Button color="violet">Back to questions</Button>
        </Link>
        {this.state.filter === "My Answers" ? (
          <div className="ui two item menu violet inverted">
            <Button className="item active" onClick={this.handleFilter}>
              My Answers
            </Button>
            <Button className="item" onClick={this.handleFilter}>
              My Submitted Questions
            </Button>
          </div>
        ) : (
          <div className="ui two item menu violet inverted">
            <Button className="item" onClick={this.handleFilter}>
              My Answers
            </Button>
            <Button className="item active" onClick={this.handleFilter}>
              My Submitted Questions
            </Button>
          </div>
        )}
        {this.state.filter === "My Answers"
          ? this.state.userAnswers.map((answer) => {
              return (
                <ProfileAnswer
                  key={answer.id}
                  answer={answer}
                  questions={this.state.associatedQuestions}
                  submittedQuestions={this.state.userQuestions}
                  filter={this.state.filter}
                />
              );
            })
          : this.state.userQuestions.map((question) => {
              return <ProfileQuestion key={question.id} question={question} />;
            })}
      </div>
    );
  }
}
