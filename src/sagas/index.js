import { call, put, takeLatest, all } from 'redux-saga/effects';
import { _getUsers, 
        _getQuestions, 
        _saveQuestion, 
        _saveQuestionAnswer
    } from '../utils/_DATA'; 
    
function* getUsers() {
  const result = yield call(_getUsers, null);    
  yield put({ type: "GET_USERS_SUCCESS", result });
}

function* getQuestions() {
    const result = yield call(_getQuestions, null);    
    yield put({ type: "GET_QUESTIONS_SUCCESS", result });
}

function* saveAnswer(action) {
    const result = action.result;
    yield call(_saveQuestionAnswer, result);    
    yield put({ type: "SAVE_ANSWER_SUCCESS", result });   
    yield put({ type: "POST_ANSWER_SUCCESS", result });
}

function* saveQuestion(action) {
    const result = yield call(_saveQuestion, action.result);    
    yield put({ type: "SAVE_QUESTION_SUCCESS", result});   
    yield put({ type: "POST_QUESTION_SUCCESS", result});
}

function* actionWatcher() {
    try{
        yield takeLatest('GET_USERS', getUsers);
        yield takeLatest('GET_QUESTIONS', getQuestions);
        yield takeLatest('SAVE_ANSWER', saveAnswer);
        yield takeLatest('SAVE_QUESTION', saveQuestion);
    }catch(e){
        console.log(`Error in Saga ${e}`)
    }
}

export default function* rootSaga() {
   yield all([
    actionWatcher(),
   ]);
}