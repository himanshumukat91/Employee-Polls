import { createStore, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";
import reducer from "./redux/reducer";
import rootSaga from "./sagas";

import { setCurrentUser } from "./actions/users";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

describe("Testing Redux", () => {

  it("Setting current user as sarahedo", () => {
    const userId = "sarahedo";
    store.dispatch(setCurrentUser(userId));
    expect(store.getState().user.currentUser).toEqual(userId);
  });

});


