import { SET_SETTING_DRAW_LINE_DURATION } from "../constants";

export function setSettingDrawLineDuration(duration: number) {
    return {
        type: SET_SETTING_DRAW_LINE_DURATION,
        value: duration,
    };
}
