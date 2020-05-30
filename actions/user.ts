import { SET_USER_INFO, SIGN_USER_IN, SIGN_USER_OUT } from "../constants";
import { UserInfo } from "../types";

export function setUserInfo(userInfo: UserInfo) {
    return {
        type: SET_USER_INFO,
        value: userInfo,
    };
}

export function signUserIn(type: "google" | "facebook") {
    return {
        type: SIGN_USER_IN,
        value: type,
    }
}

export function signUserOut() {
    return {
        type: SIGN_USER_OUT
    };
}
