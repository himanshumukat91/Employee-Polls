import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import QuestionCard from "../QuestionCard/QuestionCard";
import "./Home.css";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      questionType: "Unanswered",
    };
  }

  handleChangeQuesType = (event) => {
    this.setState({
      questionType: event.target.value,
    });
  };

  render() {
    const { userDetails, questionArray } = this.props;
    const { questionType } = this.state;

    const filterQuestions = questionArray
      .filter((question) => {
        const selectedOption = userDetails.answers[question.id];

        if (questionType === "Unanswered" && selectedOption) {
          return false;
        } else if (questionType === "Answered" && !selectedOption) {
          return false;
        } else {
          return true;
        }
      })
      .sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div className="homeContainer">
        <div className="questionContainer">
          {filterQuestions.length ? (
            filterQuestions.map((question) => (
              <div key={question.id} className="questionCard">
                <Link
                  to={`/questions/${question.id}`}
                  className="noTextDecoration"
                >
                  <QuestionCard
                    questionDetails={question}
                    currentUser={userDetails.id}
                    postAnswer={() => {}}
                    detailedView={false}
                  />
                </Link>
              </div>
            ))
          ) : (
            <Typography variant="h6" color="textSecondary">
              No New Question Available
            </Typography>
          )}
        </div>
        <div className="questionTypeContainer">
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="options"
              name="options"
              value={questionType}
              onChange={this.handleChangeQuesType}
            >
              <FormControlLabel
                value={"Unanswered"}
                control={<Radio />}
                label={"Unanswered"}
              />
              <FormControlLabel
                value={"Answered"}
                control={<Radio />}
                label={"Answered"}
              />
              <FormControlLabel
                value={"All"}
                control={<Radio />}
                label={"All"}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    questionArray: Object.values(state.questions.questions),
    userDetails: state.user.users[state.user.currentUser],
  }),
  {}
)(Home);
