import { GET_USERS_SUCCESS, SET_CURRENT_USER } from "../actions/users";
import {
  SAVE_ANSWER_SUCCESS,
  SAVE_QUESTION_SUCCESS,
} from "../actions/questions";

export default function reducer(state = { currentUser: "" }, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.result,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.result,
      };
    case SAVE_ANSWER_SUCCESS: {
      const data = action.result;
      let users = { ...state.users };
      let userDetails = users[data.authedUser];
      userDetails.answers[data.qid] = data.answer;
      return {
        ...state,
        users,
      };
    }
    case SAVE_QUESTION_SUCCESS: {
      const newQuestion = action.result;
      let users = { ...state.users };
      let userDetails = users[newQuestion.author];
      userDetails.questions.push(newQuestion.id);
      return {
        ...state,
        users,
      };
    }
    default:
      return state;
  }
}
