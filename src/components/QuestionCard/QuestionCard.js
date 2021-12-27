import React from "react";
import { connect } from "react-redux";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import "./QuestionCard.css";

function QuestionCard(props) {
  const { questionDetails, currentUser, postAnswer, detailedView, users } = props;
  const authorDetails = users[questionDetails.author];
  const currUserDetails = users[currentUser];

  const option1Votes = questionDetails.optionOne.votes.length;
  const option2Votes = questionDetails.optionTwo.votes.length;
  const totalVotes = option1Votes + option2Votes;
  const option1String = `(${option1Votes}, ${Math.round(
    (option1Votes / totalVotes) * 100
  )}%)`;
  const option2String = `(${option2Votes}, ${Math.round(
    (option2Votes / totalVotes) * 100
  )}%)`;

  let selectedOption = currUserDetails.answers[questionDetails.id] || "";

  const handleChange = (event) => {
    postAnswer(questionDetails.id, event.target.value);
  };

  return (
    <Card key={questionDetails.id} className="card">
      <CardContent>
          <div className="profileContainer">
            <img
              src={authorDetails.avatarURL}
              alt={authorDetails.name}
              className="profileImage"
            />
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className="profileText"
            >
              {authorDetails.name}
            </Typography>
          </div>
        <Typography color="textSecondary">Would you rather</Typography>
      </CardContent>
      <CardActions>
      {detailedView ? 
        (<FormControl component="fieldset">
          <RadioGroup
            aria-label="options"
            name="options"
            value={selectedOption}
            onChange={handleChange}
          >
            <FormControlLabel
              value={"optionOne"}
              control={<Radio />}
              label={`${questionDetails.optionOne.text} ${
                selectedOption ? option1String : ""
              }`}
            />
            <FormControlLabel
              value={"optionTwo"}
              control={<Radio />}
              label={`${questionDetails.optionTwo.text} ${
                selectedOption ? option2String : ""
              }`}
            />
          </RadioGroup>
        </FormControl>)
        :<Typography color="textSecondary">&nbsp;&nbsp;{`${questionDetails.optionOne.text} (or) ...`}</Typography>}
      </CardActions>
    </Card>
  );
}

export default connect(
  (state) => ({
    users: state.user.users,
  }),
  {}
)(QuestionCard);
