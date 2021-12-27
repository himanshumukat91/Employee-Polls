import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./AddQuestion.css";

import { saveQuestion } from "../../actions/questions";

function AddQuestion(props) {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  let navigate = useNavigate();

  const postQuestion = () => {
    const { userDetails, saveQuestion } = props;
    if (!userDetails) return;

    saveQuestion({
      author: userDetails.id,
      optionOneText,
      optionTwoText,
    });
    navigate("/");
  };

  const handleChange = (option) => (event) => {
    if (option === 1) setOptionOneText(event.target.value);
    else if (option === 2) setOptionTwoText(event.target.value);
  };

  return (
    <Card className="addCard">
      <CardContent>
        <div className="addContent">
          <Typography color="textSecondary">Would you rather</Typography>
          <TextField
            id="outlined-name"
            label="Option 1"
            className="option"
            value={optionOneText}
            onChange={handleChange(1)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Option 2"
            className="option"
            value={optionTwoText}
            onChange={handleChange(2)}
            margin="normal"
            variant="outlined"
          />
        </div>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          className="submit"
          variant="contained"
          onClick={postQuestion}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect(
  (state) => ({
    userDetails: state.user.users[state.user.currentUser],
  }),
  {
    saveQuestion,
  }
)(AddQuestion);
