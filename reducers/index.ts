import { combineReducers } from "redux";
import pageReducer, { PageState } from "./page";

export interface State {
    page: PageState
}

const rootReducer = combineReducers({
    page: pageReducer
});

export default rootReducer;
