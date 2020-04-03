import { combineReducers } from "redux";
import mainPageReducer, { mainPageState } from "./page/main";

export interface State {
    page: {
        main: mainPageState
    }
}

const rootReducer = combineReducers({
    page: combineReducers({
        main: mainPageReducer
    })
});

export default rootReducer;
