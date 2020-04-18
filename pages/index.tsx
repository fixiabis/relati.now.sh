import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../reducers";
import { Page, Button, IconButton } from "../components";
import { mainPageAnimationDisable } from "../actions";

const Main = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const mainPageAnimation = useSelector<State, boolean>(state => state.page.main.animation);
  const buttonGroupClassName = !mainPageAnimation ? "no-animation" : "";
  const bottomButtonGroupClassName = `to-bottom${buttonGroupClassName && ` ${buttonGroupClassName}`}`;

  useEffect(() => () => {
    if (mainPageAnimation) {
      dispatch(mainPageAnimationDisable());
    }
  }, [mainPageAnimation]);

  return (
    <Page id="main" title="relati">
      <div className="main-control">
        <div className="logo" />
        <Button.Group className={buttonGroupClassName}>
          <IconButton type="play" color="crimson" onClick={() => router.replace("/play")} />
          <IconButton type="help" color="royalblue" onClick={() => router.replace("/how-to-play")} />
        </Button.Group>
      </div>
      <Button.Group className={bottomButtonGroupClassName}>
        <IconButton type="about" color="seagreen" />
        <IconButton type="badge" color="darkorange" />
        <IconButton type="gear" color="#888" />
      </Button.Group>
    </Page>
  );
};

export default Main;
