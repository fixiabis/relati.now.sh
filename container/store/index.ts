import { createStore, applyMiddleware } from "redux";
import { MakeStore } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import firebase from "../firebase";
import reducer, { State } from "./reducers";
import rootSaga from "./sagas";
import { setUserInfo } from "./actions";

const sagaMiddleware = createSagaMiddleware();

export const makeStore: MakeStore = (initialState: State) => {
    const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        module.hot.accept("./reducers", () => {
            store.replaceReducer(require("./reducers").default);
        });
    }

    firebase.auth().onAuthStateChanged(player => {
        if (!player) {
            return;
        }

        const playerInfo = {
            playerId: player.uid,
            name: player.displayName,
            avatarUrl: player.photoURL,
        };

        setUserInfo(playerInfo);
    });

    Object.assign(globalThis, { firebase, store });

    return store;
};

export * from "./actions";
export * from "./reducers";
