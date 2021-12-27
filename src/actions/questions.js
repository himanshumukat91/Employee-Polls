export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const SAVE_ANSWER_SUCCESS = 'SAVE_ANSWER_SUCCESS';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_QUESTION_SUCCESS = 'SAVE_QUESTION_SUCCESS';

export function getQuestions(){
  return {
    type: GET_QUESTIONS,
  }
}

export function saveAnswer(answer){
  return {
    type: SAVE_ANSWER,
    result: answer
  }
}

export function saveQuestion(question){
  return {
    type: SAVE_QUESTION,
    result: question
  }
}