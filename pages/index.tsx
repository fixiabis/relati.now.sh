import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { State, disableMainPageAnimation, setEffectSettingDrawLineDuration, setTutorialSettingSceneDuration, resetAllSetting, setEffectSettingPlacementEffect, setEffectSettingLastPieceEmphasized } from "../container/store";
import { Page, Button, IconButton } from "../components";
import { SettingBox } from "../page-components/index";

const Main = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSettingBoxOpen, setIsSettingOpen] = useState(false);
  const setting = useSelector<State, State["setting"]>(state => state.setting);
  const mainPageAnimation = useSelector<State, boolean>(state => state.page.main.animation);
  const buttonGroupClassName = !mainPageAnimation ? "no-animation" : "";
  const bottomButtonGroupClassName = `to-bottom${buttonGroupClassName && ` ${buttonGroupClassName}`}`;
  const toChooseGameModePage = () => router.replace("/choose-mode?for=game");
  const toChooseTutorialModePage = () => router.replace("/choose-mode?for=tutorial");
  const toChoosePuzzleModePage = () => router.replace("/choose-mode?for=puzzle");
  const openSetting = () => setIsSettingOpen(true);
  const closeSetting = () => setIsSettingOpen(false);
  const resetSetting = () => dispatch(resetAllSetting());
  const setPlacementEffect = (isOn: boolean) => dispatch(setEffectSettingPlacementEffect(isOn));
  const setLastPieceEmphasized = (isOn: boolean) => dispatch(setEffectSettingLastPieceEmphasized(isOn));
  const setDrawLineEffectDuration = (duration: number) => dispatch(setEffectSettingDrawLineDuration(Math.round(duration / 10) * 10));
  const setTutorialSceneDuration = (duration: number) => dispatch(setTutorialSettingSceneDuration(Math.round(duration / 100) * 100));

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
          <IconButton type="play" color="crimson" title="開始遊玩" onClick={toChooseGameModePage} />
          <IconButton type="help" color="royalblue" title="如何遊玩" onClick={toChooseTutorialModePage} />
        </Button.Group>
      </div>

      <SettingBox
        show={isSettingBoxOpen}
        setting={setting}
        setPlacementEffect={setPlacementEffect}
        setLastPieceEmphasized={setLastPieceEmphasized}
        setDrawLineEffectDuration={setDrawLineEffectDuration}
        setTutorialSceneDuration={setTutorialSceneDuration}
        onReset={resetSetting}
        onClose={closeSetting} />

      <Button.Group className={bottomButtonGroupClassName}>
        <IconButton type="knowledge" title="策略" color="seagreen" onClick={toChoosePuzzleModePage} />
        <IconButton type="badge" title="成就" color="darkorange" />
        <IconButton type="gear" title="設定" color="#888" onClick={openSetting} />
      </Button.Group>
    </Page>
  );
};

export default Main;
