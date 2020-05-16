import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Game, { RelatiGameRuleX5, RelatiSymbols } from "../libraries/RelatiGame";
import { Page, Button, IconButton, MessageBox, RelatiPiece } from "../components";
import { State, SettingState } from "../reducers";
import { RelatiTutorial } from "../components/Relati";

export interface Props {
  scene?: string;
}

const HowToPlay: NextPage<Props> = ({ scene = "1" }) => {
  const router = useRouter();
  const game = useRef<Game>(new Game(2, RelatiGameRuleX5)).current;
  const [isTutorialFinish, setIsTutorialFinish] = useState(false);
  const [isTutorialFinishBoxShow, setIsTutorialFinishBoxShow] = useState(true);
  const [isTutorialLeaveMessageBoxShow, setIsTutorialLeaveMessageBoxShow] = useState(false);
  const effectSetting = useSelector<State, SettingState["effect"]>(state => state.setting.effect);
  const tutorialSetting = useSelector<State, SettingState["tutorial"]>(state => state.setting.tutorial);
  const leavePage = () => router.replace("/");
  const finishTutorial = () => setIsTutorialFinish(true);
  const openTutorialLeaveMessageBox = () => setIsTutorialLeaveMessageBoxShow(true);
  const closeTutorialFinishMessageBox = () => setIsTutorialFinishBoxShow(false);
  const closeTutorialLeaveMessageBox = () => setIsTutorialLeaveMessageBoxShow(false);

  const leaveTutorial = () => {
    if (game.turn && !isTutorialFinish) {
      openTutorialLeaveMessageBox();
    }
    else {
      leavePage();
    }
  };

  const tutorialLeaveMessageIconStyle = { backgroundImage: "url(/icons/help.svg)" };

  const tutorialLeaveMessageBox =
    isTutorialLeaveMessageBoxShow
      ? (
        <MessageBox onCancel={closeTutorialLeaveMessageBox}>
          <div className="message-container">
            <div className="message-icon" style={tutorialLeaveMessageIconStyle} />
            教學尚未結束, 確定離開?
          </div>
          <Button.Group>
            <IconButton type="accept" color="crimson" onClick={leavePage} />
            <IconButton type="reject" color="royalblue" onClick={closeTutorialLeaveMessageBox} />
          </Button.Group>
        </MessageBox>
      )
      : undefined;

  const tutorialFinishMessageIcon =
    game.isOver
      ? (
        <div className="message-icon-container">
          <svg width="5" height="5" className="message-icon">
            <RelatiPiece x={0} y={0} symbol={RelatiSymbols[game.winner] || "N"} primary />
          </svg>
        </div>
      )
      : undefined;

  const tutorialFinishMessageText =
    game.isOver
      ? (
        game.winner !== -1
          ? `${game.winner ? "藍" : "紅"}方玩家獲勝!`
          : "平手!"
      ) + " 恭喜你完成教學!"
      : undefined;

  const tutorialFinishMessageBox =
    isTutorialFinish && isTutorialFinishBoxShow
      ? (
        <MessageBox onCancel={closeTutorialFinishMessageBox}>
          <div className="message-container">
            {tutorialFinishMessageIcon}
            {tutorialFinishMessageText}
          </div>
          <Button.Group>
            <IconButton type="verify" color="seagreen" onClick={leavePage} />
          </Button.Group>
        </MessageBox>
      )
      : undefined;

  return (
    <Page id="how-to-play" title="how to play">
      <RelatiTutorial scene={scene} game={game} onFinish={finishTutorial} {...effectSetting} {...tutorialSetting} />

      <Button.Group>
        <IconButton type="leave" color="#888" onClick={leaveTutorial} />
      </Button.Group>

      {tutorialLeaveMessageBox}
      {tutorialFinishMessageBox}
    </Page>
  );
};

HowToPlay.getInitialProps = async ({ query: { scene } }) => {
  return { scene: scene as string };
};

export default HowToPlay;
