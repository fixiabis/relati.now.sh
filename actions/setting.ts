import {
    SET_EFFECT_SETTING_DRAW_LINE_DURATION,
    SET_EFFECT_SETTING_PLACEMENT_EFFECT,
    SET_EFFECT_SETTING_LAST_PIECE_EMPHASIZED,
    SET_TUTORIAL_SETTING_SCENE_DURATION,
} from "../constants";

export function setEffectSettingDrawLineDuration(duration: number) {
    return {
        type: SET_EFFECT_SETTING_DRAW_LINE_DURATION,
        value: duration,
    };
}

export function setEffectSettingPlacementEffect(isPlacementEffectOn: boolean) {
    return {
        type: SET_EFFECT_SETTING_PLACEMENT_EFFECT,
        value: isPlacementEffectOn,
    };
}

export function setEffectSettingLastPieceEmphasized(isLastPieceEmphasized: boolean) {
    return {
        type: SET_EFFECT_SETTING_LAST_PIECE_EMPHASIZED,
        value: isLastPieceEmphasized,
    };
}

export function setTutorialSettingSceneDuration(duration: number) {
    return {
        type: SET_TUTORIAL_SETTING_SCENE_DURATION,
        value: duration,
    }
}
