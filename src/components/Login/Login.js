import React, { PureComponent } from "react";
import { connect } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../App.css";
import "./Login.css";

import { setCurrentUser } from "../../actions/users";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showError: false,
    };
  }

  handleChangeUsername = (event) => {
    this.setState({ username: event?.target?.value || "" });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event?.target?.value || "" });
  };

  login = () => {
    const { username, password } = this.state;
    if (username && password && this.matchPassword(username, password)) {
      this.props.setCurrentUser(username);
      this.setState({ showError: false });
    } else {
      this.setState({ showError: true });
    }
  };

  matchPassword = (username, password) => {
    const { users } = this.props;
    const userDetails = Object.values(users);
    return userDetails.filter(
      (u) =>
        (u.name === username || u.id === username) && u.password === password
    ).length;
  };

  render() {
    const { username, password, showError } = this.state;

    return (
      <div className="loginContainer">
        <Typography variant="h5" className="loginHeading">
          PLEASE LOGIN TO CONTINUE
        </Typography>
        <TextField
          className={"loginInput"}
          id="outlined-basic"
          label="Username or Id"
          variant="filled"
          value={username}
          onChange={this.handleChangeUsername}
        />
        <TextField
          className={"loginInput"}
          id="outlined-basic"
          label="Password"
          variant="filled"
          type="password"
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
        {showError && <Typography id="error-message" variant="subtitle1" className="errorText">
          Username and Password do not match. Please try again
        </Typography>}
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
