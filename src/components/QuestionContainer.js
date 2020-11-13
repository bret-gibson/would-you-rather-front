import React, { Component } from "react";
import Choice from "./Choice";
import CommentContainer from "./CommentContainer";
import { Grid, Button } from "semantic-ui-react";

export default class QuestionContainter extends Component {
  constructor() {
    super();
    this.state = {
      question: {},
      choiceMade: false,
      firstChoiceCount: 0,
      secondChoiceCount: 0,
      total: 0,
      firstPicked: false,
      secondPicked: false,
    };
  }

  componentDidMount() {
    // fetch(
    //   `http://localhost:3000/users/${this.props.userData.id}/unique_question`
    // )
    fetch(
      `https://ancient-cliffs-69900.herokuapp.com/users/${this.props.userData.id}/unique_question`
    )
      .then((response) => response.json())
      .then((question) => {
        this.setState({ ...this.state, question: question });
      });
  }

  handleChoice = (event) => {
    let picked1 = false;
    let picked2 = false;
    let countArr = this.getQuestionStats();
    let firstCount = countArr[0];
    let secondCount = countArr[1];
    if (event.target.textContent === this.state.question.first_option) {
      picked1 = true;
    } else {
      picked2 = true;
    }

    const userQuestionObj = {
      user_id: this.props.userData.id,
      question_id: this.state.question.id,
      choice: event.target.textContent,
    };
    // fetch("http://localhost:3000/user_questions", {
    fetch("https://ancient-cliffs-69900.herokuapp.com/user_questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userQuestionObj),
    })
      .then((response) => {
        response.json();
      })
      .then((userQuestion) => {
        this.getQuestionStats();
        this.setState({
          question: { ...this.state.question, user_questions: userQuestion },
          choiceMade: true,
          firstPicked: picked1,
          secondPicked: picked2,
          firstChoiceCount: firstCount,
          secondChoiceCount: secondCount,
          total: firstCount + secondCount,
        });
      })
      .then(this.getQuestionStats());
  };

  getQuestionStats = () => {
    let choiceArr = [];
    let firstChoiceCount = 0;
    let secondChoiceCount = 0;
    this.state.question.user_questions.forEach((userQuestion) => {
      if (userQuestion.choice === this.state.question.first_option) {
        firstChoiceCount += 1;
      } else {
        secondChoiceCount += 1;
      }
    });
    choiceArr.push(firstChoiceCount);
    choiceArr.push(secondChoiceCount);
    return choiceArr;
  };

  newQuestionHandler = () => {
    // fetch(
    //   `http://localhost:3000/users/${this.props.userData.id}/unique_question`
    // )
    fetch(
      `https://ancient-cliffs-69900.herokuapp.com/users/${this.props.userData.id}/unique_question`
    )
      .then((response) => response.json())
      .then((question) => {
        this.setState({
          question: question,
          choiceMade: false,
          firstChoiceCount: 0,
          secondChoiceCount: 0,
          firstPicked: false,
          secondPicked: false,
          total: 0,
        });
      });
  };

  // doSubmit = (comment) => {
  //   const newCommentObj = {
  //     user_id: this.props.userData.id,
  //     question_id: this.state.question.id,
  //     comment_text: comment,
  //   };
  //   fetch("http://localhost:3000/comments", {
  //     // fetch("https://ancient-cliffs-69900.herokuapp.com/comments", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newCommentObj),
  //   })
  //     .then((response) => {
  //       response.json();
  //     })
  //     .then((newComment) => {
  //       this.setState({
  //         question: { ...this.state.question, comments: newComment },
  //       });
  //     });
  // };

  handleDelete = (event) => {
    let id = event.target.id;
    // fetch(`http://localhost:3000/comments/${id}`, {
    fetch(`https://ancient-cliffs-69900.herokuapp.com/comments/${id}`, {
      method: "DELETE",
    }).then((comment) => {
      let updatedComments = this.state.question.comments.filter(
        (currentComment) => {
          return currentComment.id !== id;
        }
      );
      this.setState({
        question: { ...this.state.question, comments: updatedComments },
      });
    });
  };

  // handleUpdate = (){

  // }

  choiceDivStyle = {
    color: "white",
  };

  choiceDividerStyle = {
    color: "white",
    textAlign: "center",
    paddingTop: "8x",
    paddingBottom: "10px",
  };

  pickedStyle = {
    border: "5px solid",
    borderColor: "#5829bb",
  };

  notPickedStyle = {
    border: "none",
  };

  nextButtonStyle = {
    float: "right",
  };

  render() {
    return (
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            <div></div>
          </Grid.Column>

          <Grid.Column style={this.choiceDivStyle}>
            <h1>{this.state.question.title}</h1>
            <h3>Would you rather... </h3>
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Choice
                    picked={this.state.firstPicked}
                    choice={this.state.question.first_option}
                    handleChoice={this.handleChoice}
                    choiceMade={this.state.choiceMade}
                    choiceCount={this.state.firstChoiceCount}
                    total={this.state.total}
                  />
                  <h2 style={this.choiceDividerStyle}>OR</h2>
                  <Choice
                    picked={this.state.secondPicked}
                    choice={this.state.question.second_option}
                    handleChoice={this.handleChoice}
                    choiceMade={this.state.choiceMade}
                    choiceCount={this.state.secondChoiceCount}
                    total={this.state.total}
                  />
                </Grid.Column>
                {/* <Grid.Column>
                  <h2 style={this.choiceDividerStyle}>OR</h2>
                </Grid.Column>

                <Grid.Column>
                  <Choice
                  picked={this.state.secondPicked}
                  choice={this.state.question.second_option}
                  handleChoice={this.handleChoice}
                  choiceMade={this.state.choiceMade}
                  choiceCount={this.state.secondChoiceCount}
                  total={this.state.total}
                  />
                </Grid.Column> */}
              </Grid.Row>
            </Grid>
            <h3>{this.state.question.context}</h3>
            <Button
              color="violet"
              style={this.nextButtonStyle}
              onClick={this.newQuestionHandler}
            >
              Next Question
            </Button>
          </Grid.Column>

          <Grid.Column>
            <div></div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            {Object.keys(this.state.question).length !== 0 ? (
              <CommentContainer
                userData={this.props.userData}
                question={this.state.question}
                handleDelete={this.handleDelete}
                doSubmit={this.doSubmit}
              />
            ) : (
              <h1 style={this.choiceDivStyle}>Loading Comments</h1>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      //       <div>
      //         <Grid>
      //           <Grid.Row columns={3}>
      //             {/* <Grid.Column>
      //               <p>a</p>
      //             </Grid.Column> */}

      //             <Grid.Colum>
      //               <h2>{this.state.question.title}</h2>
      //               <h4>Would you rather...</h4>
      //               <Choice
      //                 picked={this.state.firstPicked}
      //                 choice={this.state.question.first_option}
      //                 handleChoice={this.handleChoice}
      //                 choiceMade={this.state.choiceMade}
      //                 choiceCount={this.state.firstChoiceCount}
      //                 total={this.state.total}
      //                 />

      //               <Choice
      //                 picked={this.state.secondPicked}
      //                 choice={this.state.question.second_option}
      //                 handleChoice={this.handleChoice}
      //                 choiceMade={this.state.choiceMade}
      //                 choiceCount={this.state.secondChoiceCount}
      //                 total={this.state.total}
      //                 />
      //               <h3>{this.state.question.context}</h3>
      //               <Button onClick={this.newQuestionHandler}>Next Question</Button>
      //             </Grid.Colum>
      // {/*
      //             <Grid.Column>
      //               <p>a</p>
      //             </Grid.Column> */}
      //           </Grid.Row>

      //           <Grid.Row columns={1}>
      //             <Grid.Column>
      //               {Object.keys(this.state.question).length !== 0
      //               ?
      //               <CommentContainer userData={this.props.userData} question={this.state.question} handleDelete={this.handleDelete} doSubmit={this.doSubmit} updateToggle={false}/>
      //               :
      //               <h1>Loading Comments</h1>}
      //             </Grid.Column>
      //           </Grid.Row>
      //       </Grid>
      //       </div>
    );
  }
}
