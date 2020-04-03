import { createStore } from "redux";
import { MakeStore } from "next-redux-wrapper";
import reducer, { State } from "../reducers/rootReducer";

export const makeStore: MakeStore = (initialState: State) => {
    const store = createStore(reducer, initialState);

    if (module.hot) {
        module.hot.accept("../reducers/rootReducer", () => {
            store.replaceReducer(require("../reducers/rootReducer").default);
        });
    }

    return store;
};
