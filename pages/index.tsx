import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../reducers";
import { Page, Button, IconButton } from "../components";
import { mainPageAnimationDisable } from "../actions";
import Box from "../components/Box";

const Main = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSettingOpen, setSettingOpen] = useState(false);
  const mainPageAnimation = useSelector<State, boolean>(state => state.page.main.animation);
  const buttonGroupClassName = !mainPageAnimation ? "no-animation" : "";
  const bottomButtonGroupClassName = `to-bottom${buttonGroupClassName && ` ${buttonGroupClassName}`}`;
  const toPlay = () => router.replace("/play");
  const toHowToPlay = () => router.replace("/how-to-play");
  const openSetting = () => setSettingOpen(true);
  const closeSetting = () => setSettingOpen(false);

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
          <IconButton type="play" color="crimson" onClick={toPlay} />
          <IconButton type="help" color="royalblue" onClick={toHowToPlay} />
        </Button.Group>
      </div>
      <Button.Group className={bottomButtonGroupClassName}>
        <IconButton type="about" color="seagreen" />
        <IconButton type="badge" color="darkorange" />
        <IconButton type="gear" color="#888" onClick={openSetting} />
      </Button.Group>
      <Box show={isSettingOpen} onCancel={closeSetting}>
        
      </Box>
    </Page>
  );
};

export default Main;
