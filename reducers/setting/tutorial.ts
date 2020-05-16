import { AnyAction } from "redux";

import {
    SET_TUTORIAL_SETTING_SCENE_DURATION,
} from "../../constants";

export interface TutorialSettingState {
    sceneDuration: number;
}

const INITIAL_STATE: TutorialSettingState = {
    sceneDuration: 1500,
};

function tutorialSettingReducer(state = INITIAL_STATE, action: AnyAction): TutorialSettingState {
    switch (action.type) {
        case SET_TUTORIAL_SETTING_SCENE_DURATION: {
            return { ...state, sceneDuration: action.value };
        }

        default: {
            return state;
        }
    }
}

export default tutorialSettingReducer;
