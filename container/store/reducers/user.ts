import { AnyAction } from "redux";
import { UserInfo } from "../../../types";

import {
    SET_USER_INFO,
} from "../constants";

export interface UserState {
    userInfo: UserInfo | null;
}

const INITIAL_STATE: UserState = {
    userInfo: null
};

function userReducer(state = INITIAL_STATE, action: AnyAction): UserState {
    switch (action.type) {
        case SET_USER_INFO: {
            return { ...state, userInfo: action.value };
        }

        default: {
            return state;
        }
    }
}

export default userReducer;
