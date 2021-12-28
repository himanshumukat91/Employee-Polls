import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import AppRoutes from './AppRoutes'
import { getUsers } from './actions/users';
import { getQuestions } from './actions/questions';

class App extends Component {
  
  componentDidMount() {
    this.props.getUsers();
    this.props.getQuestions();
  }

  render() {
    const {currentUser, userDetails} = this.props;
    return (
      <AppRoutes currentUser={currentUser} userDetails={userDetails}/>
    );
  }
}

export default connect(
  (state) => ({
      currentUser: state.user.currentUser,
      userDetails: state.user?.currentUser ? state.user?.users[state.user?.currentUser] : {},
  }),
  {
    getUsers,
    getQuestions,
  },
)(App);