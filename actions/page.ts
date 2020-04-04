import { SET_MAIN_PAGE_ANIMATION } from "../constants";

export function mainPageAnimationDisable() {
    return {
        type: SET_MAIN_PAGE_ANIMATION,
        value: false
    };
}
