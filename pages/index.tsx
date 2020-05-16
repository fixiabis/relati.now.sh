import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../reducers";
import { Box, Page, Button, IconButton } from "../components";
import { disableMainPageAnimation } from "../actions";

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

  const settingBox = (
    <Box show={isSettingOpen} onCancel={closeSetting}>

    </Box>
  );

  return (
    <Page id="main" title="relati">
      <div className="main-control">
        <div className="logo" />
        <Button.Group className={buttonGroupClassName}>
          <IconButton type="play" color="crimson" title="開始遊玩" onClick={toChooseGameModePage} />
          <IconButton type="help" color="royalblue" title="如何遊玩" onClick={toHowToPlayPage} />
        </Button.Group>
      </div>
      <Button.Group className={bottomButtonGroupClassName}>
        <IconButton type="knowledge" title="相關知識" color="seagreen" />
        <IconButton type="badge" title="成就" color="darkorange" />
        <IconButton type="gear" title="設定" color="#888" onClick={openSetting} />
      </Button.Group>
      {settingBox}
    </Page>
  );
};

export default Main;
