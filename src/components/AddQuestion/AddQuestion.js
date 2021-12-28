import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../../App.css";
import "./AddQuestion.css";

import { saveQuestion } from "../../actions/questions";

function AddQuestion(props) {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [showError, setShowError] = useState(false);
  let navigate = useNavigate();

  const postQuestion = () => {
    const { userDetails, saveQuestion } = props;
    if (!userDetails) return;

    if (optionOneText && optionTwoText && optionOneText !== optionTwoText) {
      saveQuestion({
        author: userDetails.id,
        optionOneText,
        optionTwoText,
      });
      setShowError(false);
      navigate("/");
    } else {
      setShowError(true);
    }
    return;
  };

  return (
    <Card className="addCard">
      <CardContent>
        <div className="addContent">
          <Typography color="textSecondary">Would you rather</Typography>
          {/* <TextField
            data-testid="option-1"
            label="Option 1"
            className="option"
            value={optionOneText}
            onChange={handleChange(1)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            data-testid="option-2"
            label="Option 2"
            className="option"
            value={optionTwoText}
            onChange={handleChange(2)}
            margin="normal"
            variant="outlined"
          /> */}

          {/*Added normal input text to add unit testing automation */}
          <label htmlFor="option1" className="form-label">
            Option 1:
          </label>
          <input
            onChange={(e) => setOptionOneText(e.target.value)}
            value={optionOneText}
            type="text"
            className="form-control inputBox"
            placeholder="option 1"
            data-testid="option-1"
          />
          <label htmlFor="option2" className="form-label">
            Second Option:
          </label>
          <input
            onChange={(e) => setOptionTwoText(e.target.value)}
            value={optionTwoText}
            type="text"
            className="form-control inputBox"
            placeholder="Option 2"
            data-testid="option-2"
          />
        </div>
      </CardContent>
      <CardActions>
        <Button
          data-testid="submit-button"
          color="primary"
          className="submit"
          variant="contained"
          onClick={postQuestion}
        >
          Submit
        </Button>
        {showError && (
          <Typography
            data-testid="error-message"
            variant="subtitle1"
            className="errorText"
          >
            Option 1 and Option 2 should be non-empty string and should not be
            the same
          </Typography>
        ) }
      </CardActions>
    </Card>
  );
}

export default connect((state) => ({}), {
  saveQuestion,
})(AddQuestion);
