import { AnyAction } from "redux";

import {
    SET_SETTING_DRAW_LINE_DURATION,
    SET_SETTING_PLACEMENT_EFFECT,
    SET_SETTING_LAST_PIECE_EMPHASIZED,
} from "../constants";

export interface SettingState {
    drawLineDuration: number;
    placementEffect: boolean;
    lastPieceEmphasized: boolean;
}

const INITIAL_STATE: SettingState = {
    drawLineDuration: 180,
    placementEffect: true,
    lastPieceEmphasized: true,
};

function settingReducer(state = INITIAL_STATE, action: AnyAction) {
    switch (action.type) {
        case SET_SETTING_DRAW_LINE_DURATION: {
            return { ...state, drawLineDuration: action.value };
        }

        case SET_SETTING_PLACEMENT_EFFECT: {
            return { ...state, placementEffect: action.value };
        }

        case SET_SETTING_LAST_PIECE_EMPHASIZED: {
            return { ...state, lastPieceEmphasized: action.value };
        }

        default: {
            return state;
        }
    }
}

export default settingReducer;
