import { UserInfo } from "../../../types";
import { SET_MAIN_PAGE_ANIMATION, SET_PLAY_PAGE_ONLINE_INFO } from "../constants";

export function disableMainPageAnimation() {
    return {
        type: SET_MAIN_PAGE_ANIMATION,
        value: false
    };
}

export function providePlayPageOnlineOpponent(ownedSymbol: '' | 'O' | 'X', opponent: UserInfo | null) {
    return {
        type: SET_PLAY_PAGE_ONLINE_INFO,
        value: { ownedSymbol, opponent }
    };
}
