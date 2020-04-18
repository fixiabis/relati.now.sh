import { AnyAction } from "redux";
import { SET_SETTING_DRAW_LINE_DURATION } from "../constants/setting";

export interface SettingState {
    drawLineDuration: number;
}

const INITIAL_STATE: SettingState = {
    drawLineDuration: 180,
};

function settingReducer(state = INITIAL_STATE, action: AnyAction) {
    switch (action.type) {
        case SET_SETTING_DRAW_LINE_DURATION: {
            return { ...state, drawLineDuration: action.value };
        }

        default: {
            return state;
        }
    }
}

export default settingReducer;
