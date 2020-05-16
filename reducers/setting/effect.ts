import { AnyAction } from "redux";

import {
    SET_EFFECT_SETTING_DRAW_LINE_DURATION,
    SET_EFFECT_SETTING_PLACEMENT_EFFECT,
    SET_EFFECT_SETTING_LAST_PIECE_EMPHASIZED,
} from "../../constants";

export interface EffectSettingState {
    drawLineDuration: number;
    placementEffect: boolean;
    lastPieceEmphasized: boolean;
}

const INITIAL_STATE: EffectSettingState = {
    drawLineDuration: 180,
    placementEffect: true,
    lastPieceEmphasized: true,
};

function effectSettingReducer(state = INITIAL_STATE, action: AnyAction): EffectSettingState {
    switch (action.type) {
        case SET_EFFECT_SETTING_DRAW_LINE_DURATION: {
            return { ...state, drawLineDuration: action.value };
        }

        case SET_EFFECT_SETTING_PLACEMENT_EFFECT: {
            return { ...state, placementEffect: action.value };
        }

        case SET_EFFECT_SETTING_LAST_PIECE_EMPHASIZED: {
            return { ...state, lastPieceEmphasized: action.value };
        }

        default: {
            return state;
        }
    }
}

export default effectSettingReducer;
