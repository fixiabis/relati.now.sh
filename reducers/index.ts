import { combineReducers } from "redux";
import pageReducer, { PageState } from "./page";
import settingReducer, { SettingState } from "./setting";
import userReducer, { UserState } from "./user";

export interface State {
    page: PageState;
    setting: SettingState;
    user: UserState;
}

const rootReducer = combineReducers({
    page: pageReducer,
    setting: settingReducer,
    user: userReducer,
});

export type { PageState, SettingState, UserState };
export default rootReducer;
