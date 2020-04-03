import { combineReducers } from "redux";
import mainPageReducer, { MainPageState } from "./main";

export interface PageState {
    main: MainPageState
}

const pageReducer = combineReducers({
    main: mainPageReducer
});

export default pageReducer;
