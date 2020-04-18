import {
    SET_SETTING_DRAW_LINE_DURATION,
    SET_SETTING_PLACEMENT_EFFECT,
    SET_SETTING_LAST_PIECE_EMPHASIZED,
} from "../constants";

export function setSettingDrawLineDuration(duration: number) {
    return {
        type: SET_SETTING_DRAW_LINE_DURATION,
        value: duration,
    };
}

export function setSettingPlacementEffect(placementEffect: boolean) {
    return {
        type: SET_SETTING_PLACEMENT_EFFECT,
        value: placementEffect,
    };
}

export function setSettingLastPieceEmphasized(lastPieceEmphasized: boolean) {
    return {
        type: SET_SETTING_LAST_PIECE_EMPHASIZED,
        value: lastPieceEmphasized,
    };
}
