import React, { useState } from "react";
import { NextPage } from "next";
import Game from "../libs/Relati";
import { useRouter } from "next/router";
import { Page, Button, IconButton, RelatiTutorial, MessageBox, RelatiPiece } from "../components";
import { useSelector } from "react-redux";
import { State } from "../reducers";
import { SettingState } from "../reducers/setting";

export interface Props {
  step?: string;
}

const HowToPlay: NextPage<Props> = ({ step = "1" }) => {
  const router = useRouter();
  const [game] = useState<Game>(new Game(2));
  const [isTutorialFinish, setIsTutorialFinish] = useState(false);
  const [isTutorialLeaveMessageBoxShow, setIsTutorialLeaveMessageBoxShow] = useState(false);
  const tutorialSetting = useSelector<State, SettingState>(state => state.setting);
  const leavePage = () => router.replace("/");
  const finishTutorial = () => setIsTutorialFinish(true);
  const openTutorialLeaveMessageBox = () => setIsTutorialLeaveMessageBoxShow(true);
  const closeTutorialLeaveMessageBox = () => setIsTutorialLeaveMessageBoxShow(false);

  const leaveTutorial = () => {
    if (game.turn && !isTutorialFinish) {
      openTutorialLeaveMessageBox();
    }
    else {
      leavePage();
    }
  };

  const tutorialLeaveMessageBox =
    isTutorialLeaveMessageBoxShow
      ? (
        <MessageBox onCancel={closeTutorialLeaveMessageBox}>
          <div className="message-container">
            <div className="message-icon-container">
              <svg width="5" height="5" className="message-icon">
                <RelatiPiece x={0} y={0} symbol="K" primary />
              </svg>
            </div>
            教學尚未結束, 確定離開?
          </div>
          <Button.Group>
            <IconButton type="accept" color="crimson" onClick={leavePage} />
            <IconButton type="reject" color="royalblue" onClick={closeTutorialLeaveMessageBox} />
          </Button.Group>
        </MessageBox>
      )
      : undefined;

  const tutorialFinishMessageBox = (
    <MessageBox show={isTutorialFinish}>
      <div className="message-container">
        <div className="message-icon-container">
          <svg width="5" height="5" className="message-icon">
            <RelatiPiece x={0} y={0} symbol="O" primary />
          </svg>
        </div>
        恭喜你完成教學!
      </div>
      <Button.Group>
        <IconButton type="verify" color="seagreen" onClick={leavePage} />
      </Button.Group>
    </MessageBox>
  );

  return (
    <Page id="how-to-play" title="how to play">
      <RelatiTutorial step={step} game={game} onFinish={finishTutorial} {...tutorialSetting} />

      <Button.Group>
        <IconButton type="leave" color="#888" onClick={leaveTutorial} />
      </Button.Group>

      {tutorialLeaveMessageBox}
      {tutorialFinishMessageBox}
    </Page>
  );
};

HowToPlay.getInitialProps = async ({ query: { step } }) => {
  return { step: step as string };
};

export default HowToPlay;
