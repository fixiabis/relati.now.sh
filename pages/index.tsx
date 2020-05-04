import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../reducers";
import { Page, Button, IconButton } from "../components";
import { disableMainPageAnimation } from "../actions";
import Box from "../components/Box";

const Main = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const mainPageAnimation = useSelector<State, boolean>(state => state.page.main.animation);
  const buttonGroupClassName = !mainPageAnimation ? "no-animation" : "";
  const bottomButtonGroupClassName = `to-bottom${buttonGroupClassName && ` ${buttonGroupClassName}`}`;
  const toChooseGameModePage = () => router.replace("/choose-game-mode");
  const toHowToPlayPage = () => router.replace("/how-to-play");
  const openSetting = () => setIsSettingOpen(true);
  const closeSetting = () => setIsSettingOpen(false);

  useEffect(() => () => {
    if (mainPageAnimation) {
      dispatch(disableMainPageAnimation());
    }
  }, [mainPageAnimation]);

  return (
    <Page id="main" title="relati">
      <div className="main-control">
        <div className="logo" />
        <Button.Group className={buttonGroupClassName}>
          <IconButton type="play" color="crimson" onClick={toChooseGameModePage} />
          <IconButton type="help" color="royalblue" onClick={toHowToPlayPage} />
        </Button.Group>
      </div>
      <Button.Group className={bottomButtonGroupClassName}>
        <IconButton type="knowledge" color="seagreen" />
        <IconButton type="badge" color="darkorange" />
        <IconButton type="gear" color="#888" onClick={openSetting} />
      </Button.Group>
      <Box show={isSettingOpen} onCancel={closeSetting}>
        
      </Box>
    </Page>
  );
};

export default Main;
