import { combineReducers } from "redux";
import mainPageReducer, { MainPageState } from "./main";
import playPageReducer, { PlayPageState } from "./play";

export interface PageState {
    main: MainPageState;
    play: PlayPageState;
}

const pageReducer = combineReducers({
    main: mainPageReducer,
    play: playPageReducer
});

export default pageReducer;
