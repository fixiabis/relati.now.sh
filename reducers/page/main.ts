import { AnyAction } from "redux";
import { SET_MAIN_PAGE_ANIMATION } from "../../constants/page";

export interface mainPageState {
    animation: boolean;
}

const INITIAL_STATE: mainPageState = {
    animation: true,
};

function mainPageReducer(state = INITIAL_STATE, action: AnyAction) {
    switch (action.type) {
        case SET_MAIN_PAGE_ANIMATION: {
            return { ...state, animation: action.value };
        }

        default: {
            return state;
        }
    }
}

export default mainPageReducer;
