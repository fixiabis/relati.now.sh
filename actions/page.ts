import { SET_MAIN_PAGE_ANIMATION } from "../constants/page";

export function mainPageStopAnimation() {
    return {
        type: SET_MAIN_PAGE_ANIMATION,
        value: false
    };
}
