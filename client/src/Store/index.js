import { createStore, applyMiddleware } from "redux";
import { Reducer } from "../Reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  Reducer,
  composeWithDevTools(applyMiddleware(thunk)) //thunk es para peticiones asincrónicas
);
