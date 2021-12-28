import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import QuestionCard from "../QuestionCard/QuestionCard";
import NoMatch from "../NoMatch/NoMatch";
import "./QuestionDetails.css";

import { saveAnswer } from "../../actions/questions";

function QuestionDetails(props) {
  const postAnswer = (id, option) => {
    const { currentUser, saveAnswer } = props;
    saveAnswer({
      authedUser: currentUser,
      qid: id,
      answer: option,
    });
  };

  let params = useParams();
  const { questions } = props;
  let question = null;
  if (params?.questionId) {
    question = questions[params.questionId];
  }

  if (!question?.id) return <NoMatch />;
  return (
    <div className="questionsContainer">
      <QuestionCard
        questionDetails={question}
        currentUser={props.currentUser}
        postAnswer={postAnswer}
        detailedView={true}
      />
    </div>
  );
}

export default connect(
  (state) => ({
    currentUser: state.user.currentUser,
    questions: state.questions.questions,
  }),
  {
    saveAnswer,
  }
)(QuestionDetails);
