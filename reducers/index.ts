import { combineReducers } from "redux";
import pageReducer, { PageState } from "./page";
import settingReducer, { SettingState } from "./setting";

export interface State {
    page: PageState;
    setting: SettingState;
}

const rootReducer = combineReducers({
    page: pageReducer,
    setting: settingReducer,
});

export default rootReducer;
