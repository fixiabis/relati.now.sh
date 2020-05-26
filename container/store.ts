import { createStore } from "redux";
import { MakeStore } from "next-redux-wrapper";
import reducer, { State } from "../reducers";

export const makeStore: MakeStore = (initialState: State) => {
    const store = createStore(reducer, initialState);

    if (module.hot) {
        module.hot.accept("../reducers", () => {
            store.replaceReducer(require("../reducers").default);
        });
    }

    return store;
};
