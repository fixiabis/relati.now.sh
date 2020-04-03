import React from 'react';
import { Provider } from 'react-redux';
import App, { AppContext } from 'next/app';
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper';
import { makeStore } from '../containers/store';
import { State } from '../reducers/rootReducer';

class RelatiApp extends App<ReduxWrapperAppProps<State>> {
    public static async getInitialProps({ Component, ctx }: AppContext) {
        return {
            pageProps: {
                ...(await Component.getInitialProps?.(ctx) || {}),
                pathname: ctx.pathname,
            }
        };
    }

    public render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default withRedux(makeStore, { debug: true })(RelatiApp);