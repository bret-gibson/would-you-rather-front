import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import NavBar from "./components/NavBar";
import Signin from "./components/Signin";
import QuestionContainer from "./components/QuestionContainer";
import SubmitQuestionForm from "./components/SubmitQuestionForm";
import ProfilePage from "./components/ProfilePage";
import { Route, Switch } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userData: null,
    };
  }

  submitUser = (userObj) => {
    // fetch("http://localhost:3000/users")
    fetch("https://ancient-cliffs-69900.herokuapp.com/users")
      .then((response) => response.json())

      .then((users) => {
        const user = users.find((user) => user.username === userObj.username);
        // fetch(`http://localhost:3000/users/${user.id}/login`)
        fetch(
          `https://ancient-cliffs-69900.herokuapp.com/users/${user.id}/login`
        )
          .then((response) => response.json())
          .then((userData) => {
            this.setState({ userData });
          });
      });
  };

  createUser = (userObj) => {
    // fetch("http://localhost:3000/users", {
    fetch("https://ancient-cliffs-69900.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((res) => res.json())
      .then((data) => {
        this.submitUser(data);
      });
  };

  handleLogout = (event) => {
    this.setState({ userData: null });
  };

  style = {
    color: "white",
  };

  render() {
    return (
      <div className="App">
        {this.state.userData && (
          <NavBar
            userData={this.state.userData}
            handleLogout={this.handleLogout}
          />
        )}
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Signin
                submitUser={this.submitUser}
                userData={this.state.userData}
              />
            )}
          />

          <Route
            exact
            path="/create-account"
            render={() => (
              <CreateAccount
                createUser={this.createUser}
                submitUser={this.submitUser}
                userData={this.state.userData}
              />
            )}
          />

          <Route
            exact
            path={`/question`}
            render={() => {
              if (this.state.userData != null) {
                return <QuestionContainer userData={this.state.userData} />;
              } else {
                return <h1 style={this.style}>Loading...</h1>;
              }
            }}
          />

          <Route
            exact
            path={"/submit_question"}
            render={() => {
              if (this.state.userData != null) {
                return <SubmitQuestionForm userData={this.state.userData} />;
              }
            }}
          />

          <Route
            exact
            path={"/users/:id"}
            render={() => <ProfilePage userData={this.state.userData} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
