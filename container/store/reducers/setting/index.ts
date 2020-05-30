import { combineReducers } from "redux";
import effectSettingReducer, { EffectSettingState } from "./effect";
import tutorialSettingReducer, { TutorialSettingState } from "./tutorial";

export interface SettingState {
    effect: EffectSettingState;
    tutorial: TutorialSettingState;
}

const settingReducer = combineReducers({
    effect: effectSettingReducer,
    tutorial: tutorialSettingReducer,
});

export default settingReducer;
