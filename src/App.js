import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './AppRoutes'
import { getUsers } from './actions/users';
import { getQuestions } from './actions/questions';

class App extends Component {
  
  componentDidMount() {
    this.props.getUsers();
    this.props.getQuestions();
  }

  render() {
    const {currentUser} = this.props;
    return (
      // <Router>
        // <Fragment>
          // <div>
            <AppRoutes currentUser={currentUser}/>
          // </div>
        // </Fragment>
      // </Router>
    );
  }
}

export default connect(
  (state) => ({
      currentUser: state.user.currentUser,
  }),
  {
    getUsers,
    getQuestions,
  },
)(App);