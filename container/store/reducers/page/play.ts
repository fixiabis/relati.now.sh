import { AnyAction } from "redux";
import { UserInfo } from "../../../../types";
import { SET_PLAY_PAGE_ONLINE_INFO } from "../../constants";

export interface PlayPageState {
    online: {
        ownedSymbol: '' | 'O' | 'X',
        opponent: UserInfo | null
    }
}

const INITIAL_STATE: PlayPageState = {
    online: {
        ownedSymbol: '',
        opponent: null
    },
};

function playPageReducer(state = INITIAL_STATE, action: AnyAction): PlayPageState {
    switch (action.type) {
        case SET_PLAY_PAGE_ONLINE_INFO: {
            return { ...state, online: action.value };
        }

        default: {
            return state;
        }
    }
}

export default playPageReducer;
