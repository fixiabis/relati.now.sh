import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../container/firebase";
import { State } from "../reducers";
import { Box, Page, Button, Range, IconButton, Switch } from "../components";
import { disableMainPageAnimation, setEffectSettingDrawLineDuration, setTutorialSettingSceneDuration, resetAllSetting, setEffectSettingPlacementEffect, setEffectSettingLastPieceEmphasized } from "../actions";

const Main = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const setting = useSelector<State, State["setting"]>(state => state.setting);
  const mainPageAnimation = useSelector<State, boolean>(state => state.page.main.animation);
  const buttonGroupClassName = !mainPageAnimation ? "no-animation" : "";
  const bottomButtonGroupClassName = `to-bottom${buttonGroupClassName && ` ${buttonGroupClassName}`}`;
  const toChooseGameModePage = () => router.replace("/choose-mode?for=game");
  const toChooseTutorialModePage = () => router.replace("/choose-mode?for=tutorial");
  const openSetting = () => setIsSettingOpen(true);
  const closeSetting = () => setIsSettingOpen(false);

  const resetSetting = () => {
    dispatch(resetAllSetting());
  };

  const setPlacementEffect = (isOn: boolean) => {
    dispatch(setEffectSettingPlacementEffect(isOn));
  };

  const setLastPieceEmphasized = (isOn: boolean) => {
    dispatch(setEffectSettingLastPieceEmphasized(isOn));
  };

  const setDrawLineEffectDuration = (duration: number) => {
    dispatch(setEffectSettingDrawLineDuration(Math.round(duration / 10) * 10));
  };

  const setTutorialSceneDuration = (duration: number) => {
    dispatch(setTutorialSettingSceneDuration(Math.round(duration / 100) * 100));
  };

  useEffect(() => () => {
    if (mainPageAnimation) {
      dispatch(disableMainPageAnimation());
    }
  }, [mainPageAnimation]);

  useEffect(() => {
    return; // disabled

    firebase.auth().onAuthStateChanged(player => {
       if (!player) {
        return;
       }

      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        const firebaseFacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(firebaseFacebookAuthProvider).then(() => {
          const { currentUser: player } = firebase.auth();

          if (!player) {
            return;
          }

          firebase.firestore().collection("players").doc(player.uid).update({
            name: player.displayName,
            avatarURL: player.photoURL,
          });
        });
      });
    });
  });

  const settingBox =
    isSettingOpen
      ? (
        <Box className="setting">
          <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div>符號放置特效</div>
              <Switch value={setting.effect.placementEffect} onChange={setPlacementEffect} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div>強調最後符號</div>
              <Switch value={setting.effect.lastPieceEmphasized} onChange={setLastPieceEmphasized} />
            </div>
          </div>

          <div>連線特效速度({(setting.effect.drawLineDuration / 1000).toFixed(2)}秒)</div>

          <Range
            min={100}
            max={1000}
            value={setting.effect.drawLineDuration}
            onChange={setDrawLineEffectDuration} />

          <div>教學場景速度({(setting.tutorial.sceneDuration / 1000).toFixed(1)}秒)</div>

          <Range
            min={500}
            max={2000}
            value={setting.tutorial.sceneDuration}
            onChange={setTutorialSceneDuration} />

          <Button.Group className={buttonGroupClassName}>
            <IconButton type="retry" color="crimson" title="重設" onClick={resetSetting} />
            <IconButton type="verify" color="seagreen" title="完成" onClick={closeSetting} />
          </Button.Group>
        </Box>
      )
      : undefined;

  return (
    <Page id="main" title="relati">
      <div className="main-control">
        <div className="logo" />
        <Button.Group className={buttonGroupClassName}>
          <IconButton type="play" color="crimson" title="開始遊玩" onClick={toChooseGameModePage} />
          <IconButton type="help" color="royalblue" title="如何遊玩" onClick={toChooseTutorialModePage} />
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
