import { createStore } from "redux";
import reducer from "../reducers";

const initialState = { articles: ''};
export const store = createStore(reducer, initialState);
