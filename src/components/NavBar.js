 import React, { Component } from 'react'
 import { Link } from 'react-router-dom'
 import { Menu } from 'semantic-ui-react'


   
export default class NavBar extends Component{
    render(){
        return(
          <Menu>
            <Menu.Item header>
              Would You Rather
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item as={Link} to="/submit_question">
                  Submit a Question
              </Menu.Item>
              <Menu.Item as={Link} to={`/users/${this.props.userData.id}`}>
                  {this.props.userData.username}
              </Menu.Item>
              <Menu.Item onClick={this.props.handleLogout} as={Link} to="/">
                  Logout
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        )
    }
}