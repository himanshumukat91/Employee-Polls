import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import createSagaMiddleware from "redux-saga";
import reducer from "../../redux/reducer";
import rootSaga from "../../sagas";

import AddQuestion from "./AddQuestion";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

describe("FireEvent testing: Add Question Flow", () => {
    const props = {
      userDetails: {
        id: "sarahedo",
        password: "password123",
        name: "Sarah Edo",
        avatarURL: "https://picsum.photos/id/201/100/100.jpg",
        answers: {
          "8xf0y6ziyjabvozdd253nd": "optionOne",
          "6ni6ok3ym7mf1p33lnez": "optionOne",
          am8ehyc8byjqgar0jgpub9: "optionTwo",
          loxhs1bqm25b708cmbf3g: "optionTwo",
        },
        questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
      },
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