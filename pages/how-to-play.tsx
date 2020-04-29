import React, { useState } from "react";
import { NextPage } from "next";
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
  const [isTutorialFinish, setIsTutorialFinish] = useState(false);
  const [isTutorialLeaveMessageBoxShow, setIsTutorialLeaveMessageBoxShow] = useState(false);
  const tutorialSetting = useSelector<State, SettingState>(state => state.setting);
  const tutorialOnOver = () => setIsTutorialFinish(true);
  const tutorialLeaveMessageBoxOpen = () => setIsTutorialLeaveMessageBoxShow(true);
  const tutorialLeaveMessageBoxClose = () => setIsTutorialLeaveMessageBoxShow(false);

  const leaveTutorial = () => {
    if (!isTutorialFinish) {
      tutorialLeaveMessageBoxOpen();
    }
    else {
      router.replace("/");
    }
  };

  return (
    <Page id="how-to-play" title="how to play">
      <RelatiTutorial step={step} onOver={tutorialOnOver} {...tutorialSetting} />

      <Button.Group>
        <IconButton type="leave" color="#888" onClick={leaveTutorial} />
      </Button.Group>

      <MessageBox show={isTutorialLeaveMessageBoxShow} onCancel={tutorialLeaveMessageBoxClose}>
        <div className="message-container">
          <div className="message-icon-container">
            <svg width="5" height="5" className="message-icon">
              <RelatiPiece x={0} y={0} symbol="K" primary />
            </svg>
          </div>
          教學尚未結束, 確定離開?
        </div>
        <Button.Group>
          <IconButton type="accept" color="crimson" onClick={() => router.replace("/")} />
          <IconButton type="reject" color="royalblue" onClick={tutorialLeaveMessageBoxClose} />
        </Button.Group>
      </MessageBox>

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
          <IconButton type="verify" color="seagreen" onClick={() => router.replace("/")} />
        </Button.Group>
      </MessageBox>
    </Page>
  );
};

HowToPlay.getInitialProps = async ({ query: { step } }) => {
  return { step: step as string };
};

export default HowToPlay;
