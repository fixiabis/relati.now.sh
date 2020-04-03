import { SET_MAIN_PAGE_ANIMATION } from "../constants";

export function mainPageStopAnimation() {
    return {
        type: SET_MAIN_PAGE_ANIMATION,
        value: false
    };
}
