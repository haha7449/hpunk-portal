import { createStore, applyMiddleware,compose } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import promise from "redux-promise";

const store = createStore(
  reducer,
  compose(applyMiddleware(thunk, promise),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
