import * as React from "react";
import { render } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import createSagaMiddleware from "redux-saga";
import reducer from "../../redux/reducer";
import rootSaga from "../../sagas";

import Menubar from "./Menubar";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

describe("Testing snapshots for Menubar Component", () => {
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