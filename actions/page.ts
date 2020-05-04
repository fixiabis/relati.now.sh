import { SET_MAIN_PAGE_ANIMATION } from "../constants";

export function disableMainPageAnimation() {
    return {
        type: SET_MAIN_PAGE_ANIMATION,
        value: false
    };
}
