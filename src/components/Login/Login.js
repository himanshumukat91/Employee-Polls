import React, { PureComponent } from "react";
import { connect } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Login.css";

import { setCurrentUser } from "../../actions/users";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChangeUsername = (event) => {
      this.setState({username: event?.target?.value || ""})
  }

  handleChangePassword = (event) => {
      this.setState({password: event?.target?.value || ""})
  }

  login = () => {
    // const { history, location } = this.props;
    const {username, password} = this.state;
    if (username && password && this.matchPassword(username, password)) {
      this.props.setCurrentUser(username);
    //   history.push(location.pathname);
    }
  };

  matchPassword = (username, password) => {
      const {users} = this.props;
      const userDetails = Object.values(users);
      return userDetails.filter(u => ((u.name === username || u.id === username) && u.password === password)).length;
  }

  render() {
    const {username, password} = this.state;

    return (
      <div className="loginContainer">
        <Typography variant="h5" className="loginHeading">
          TELL US WHO YOU ARE
        </Typography>
        <TextField className={'loginInput'}
            id="outlined-basic" label="Username or Id" variant="filled"
          value={username}
          onChange={this.handleChangeUsername}
        />
        <TextField className={'loginInput'}
            id="outlined-basic" label="Password" variant="filled"
          value={password}
          onChange={this.handleChangePassword}
        />
        <Button
          variant="contained"
          color="primary"
          className="loginButton"
          onClick={this.login}
        >
          Login
        </Button>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    users: state.user.users,
  }),
  {
    setCurrentUser,
  }
)(Login);
