import * as React from "react";
import { render, fireEvent } from '@testing-library/react';
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import createSagaMiddleware from 'redux-saga';
import reducer from './redux/reducer';
import rootSaga from './sagas';

import { _saveQuestion, _saveQuestionAnswer } from "./utils/_DATA";
import App from './App';
import Menubar from "./components/Menubar/Menubar";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import { setCurrentUser } from "./actions/users";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  );
sagaMiddleware.run(rootSaga);

describe("Testing _saveQuestion()", () => {
  it("returns error for missing option 1", async () => {
    const questionInputData = {
      optionTwoText: "Option 2",
      author: "NA"
    };
    const error = "Please provide optionOneText, optionTwoText, and author";
    await expect(_saveQuestion(questionInputData)).rejects.toEqual(error);
  });

  it("returns error for missing option 2", async () => {
    const questionInputData = {
      optionOneText: "Option 1",
      author: "NA"
    };
    const error = "Please provide optionOneText, optionTwoText, and author";
    await expect(_saveQuestion(questionInputData)).rejects.toEqual(error);
  });

  it("returns error for missing author", async () => {
    const questionInputData = {
      optionOneText: "Option 1",
      optionTwoText: "Option 2",
    };
    const error = "Please provide optionOneText, optionTwoText, and author";
    await expect(_saveQuestion(questionInputData)).rejects.toEqual(error);
  });

  it("returns the correct formatted question for correct input data", async () => {
    const questionInputData = {
      optionOneText: "Option 1",
      optionTwoText: "Option 2",
      author: "sarahedo"
    };
    const questionData = await _saveQuestion(questionInputData);
    expect(questionData).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        timestamp: expect.any(Number),
        author: questionInputData.author,
        optionOne: { text: questionInputData.optionOneText, votes: [] },
        optionTwo: { text: questionInputData.optionTwoText, votes: [] }
      })
    );
  });
});

describe("Testing _saveQuestionAnswer()", () => {
  it("returns error for missing qid", async () => {
    const answerInputData = {
      authedUser: "sarahedo",
      answer: "optionTwo"
    };
    const error = "Please provide authedUser, qid, and answer";
    await expect(_saveQuestionAnswer(answerInputData)).rejects.toEqual(error);
  });

  it("returns error for missing author", async () => {
    const answerInputData = {
      answer: "optionTwo",
      qid: "xj352vofupe1dqz9emx13r"
    };
    const error = "Please provide authedUser, qid, and answer";
    await expect(_saveQuestionAnswer(answerInputData)).rejects.toEqual(error);
  });

  it("returns error for missing answer", async () => {
    const answerInputData = {
      authedUser: "sarahedo",
      qid: "xj352vofupe1dqz9emx13r"
    };
    const error = "Please provide authedUser, qid, and answer";
    await expect(_saveQuestionAnswer(answerInputData)).rejects.toEqual(error);
  });

  // it("returns true for correct input data", async () => {
  //   const answerInputData = {
  //     authedUser: "sarahedo",
  //     qid: "xj352vofupe1dqz9emx13r",
  //     answer: "optionTwo"
  //   };
  //   const response = await _saveQuestionAnswer(answerInputData);
  //   expect(response).toBe(true);
  // });
});


describe("Testing Redux", () => {
  it("Setting current user as sarahedo", () => {
    const userId = 'sarahedo';
    store.dispatch(setCurrentUser(userId));
    expect(store.getState().user.currentUser).toEqual(userId);
  });
});

describe("Testing snapshots for Menubar Component", () => {
  const props = {
    userDetails: {
      id: 'sarahedo',
      password:'password123',
      name: 'Sarah Edo',
      avatarURL: 'https://picsum.photos/id/201/100/100.jpg',
      answers: {
        "8xf0y6ziyjabvozdd253nd": 'optionOne',
        "6ni6ok3ym7mf1p33lnez": 'optionOne',
        "am8ehyc8byjqgar0jgpub9": 'optionTwo',
        "loxhs1bqm25b708cmbf3g": 'optionTwo'
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    }
  };
  it("Match snapshot with userDetails props", async () => {
    let component = render(
          <Provider store={store}>
            <BrowserRouter>
              <Menubar {...props} />
            </BrowserRouter>
          </Provider>
      );
    expect(component).toMatchSnapshot();
  });

  it("Match snapshot without userDetails props", async () => {
    let component = render(
          <Provider store={store}>
            <BrowserRouter>
              <Menubar />
            </BrowserRouter>
          </Provider>
      );
    expect(component).toMatchSnapshot();
  });
});

describe("FireEvent testing: Add Question Flow", () => {
  const props = {
    userDetails: {
      id: 'sarahedo',
      password:'password123',
      name: 'Sarah Edo',
      avatarURL: 'https://picsum.photos/id/201/100/100.jpg',
      answers: {
        "8xf0y6ziyjabvozdd253nd": 'optionOne',
        "6ni6ok3ym7mf1p33lnez": 'optionOne',
        "am8ehyc8byjqgar0jgpub9": 'optionTwo',
        "loxhs1bqm25b708cmbf3g": 'optionTwo'
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    }
  };

  it("show error message if Option 1 is empty string", async () => {
    let component = render(
          <Provider store={store}>
            <BrowserRouter>
              <AddQuestion {...props} />
            </BrowserRouter>
          </Provider>
      );
    const optionOne = component.getByTestId("option-1");
    const optionTwo = component.getByTestId("option-2");
    const submitButton = component.getByTestId("submit-button");
    fireEvent.change(optionOne, { target: { value: "" } });
    fireEvent.change(optionTwo, { target: { value: "Option 2" } });
    fireEvent.click(submitButton);
    expect(component.getByTestId("error-message")).toBeInTheDocument();
  });

  it("show error message if Option 1 and Option 2 are the same", async () => {
    let component = render(
          <Provider store={store}>
            <BrowserRouter>
              <AddQuestion {...props} />
            </BrowserRouter>
          </Provider>
      );
    const optionOne = component.getByTestId("option-1");
    const optionTwo = component.getByTestId("option-2");
    const submitButton = component.getByTestId("submit-button");
    fireEvent.change(optionOne, { target: { value: "Option" } });
    fireEvent.change(optionTwo, { target: { value: "Option" } });
    fireEvent.click(submitButton);
    expect(component.getByTestId("error-message")).toBeInTheDocument();
  });

  it("show error message if Option 2 is empty string", async () => {
    let component = render(
          <Provider store={store}>
            <BrowserRouter>
              <AddQuestion {...props} />
            </BrowserRouter>
          </Provider>
      );
    const optionOne = component.getByTestId("option-1");
    const optionTwo = component.getByTestId("option-2");
    const submitButton = component.getByTestId("submit-button");
    fireEvent.change(optionOne, { target: { value: "Option 1" } });
    fireEvent.change(optionTwo, { target: { value: "" } });
    fireEvent.click(submitButton);
    expect(component.getByTestId("error-message")).toBeInTheDocument();
  });

  it("Success if both options are filled", async () => {
    let component = render(
          <Provider store={store}>
            <BrowserRouter>
              <AddQuestion {...props} />
            </BrowserRouter>
          </Provider>
      );

    const optionOne = component.getByTestId("option-1");
    const optionTwo = component.getByTestId("option-2");
    const submitButton = component.getByTestId("submit-button");
    fireEvent.change(optionOne, { target: { value: "Option 1" } });
    fireEvent.change(optionTwo, { target: { value: "Option 2" } });
    fireEvent.click(submitButton);
    expect(component.queryByTestId("error-message")).not.toBeInTheDocument();
  });

});