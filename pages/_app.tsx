import React from 'react';
import { Provider } from 'react-redux';
import App, { AppContext } from 'next/app';
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper';
import { State } from '../reducers';
import { makeStore } from '../containers/store';
import "../styles/index.scss";
import "../styles/play.scss";
import "../styles/how-to-play.scss";
import "../styles/choose-play-mode.scss";

class RelatiApp extends App<ReduxWrapperAppProps<State>> {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    const initialProps = await Component.getInitialProps?.(ctx) || {};

    return {
      pageProps: {
        ...initialProps,
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

export default withRedux(makeStore)(RelatiApp);
