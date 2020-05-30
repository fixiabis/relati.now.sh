import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Game, { RelatiGameRule, RelatiGameRuleX5, RelatiGameRuleX7, RelatiGameRuleX9, RelatiSymbols } from "../libraries/RelatiGame";
import { Page, Button, IconButton, MessageBox, RelatiPiece, RelatiTutorialX5, RelatiTutorialX7, RelatiTutorialX9 } from "../components";
import { State, SettingState } from "../container/store";
import { LeaveMessageBox, FinishMessageBox } from "../page-components/how-to-play";

const gameRuleFromSize: Record<number, RelatiGameRule> = {
  5: RelatiGameRuleX5,
  7: RelatiGameRuleX7,
  9: RelatiGameRuleX9,
};

const RelatiTutorialFromSize: Record<number, (typeof RelatiTutorialX5 | typeof RelatiTutorialX7)> = {
  5: RelatiTutorialX5,
  7: RelatiTutorialX7,
  9: RelatiTutorialX9,
};

export interface Props {
  size: number;
  scene?: string;
}

const HowToPlay: NextPage<Props> = ({ size, scene = "1" }) => {
  const router = useRouter();
  const gameRule = gameRuleFromSize[size];
  const game = useRef<Game>(new Game(2, gameRule)).current;
  const [isTutorialFinish, setIsTutorialFinish] = useState(false);
  const [isTutorialFinishBoxShow, setIsTutorialFinishBoxShow] = useState(true);
  const [isTutorialLeaveMessageBoxShow, setIsTutorialLeaveMessageBoxShow] = useState(false);
  const effectSetting = useSelector<State, SettingState["effect"]>(state => state.setting.effect);
  const tutorialSetting = useSelector<State, SettingState["tutorial"]>(state => state.setting.tutorial);
  const leavePage = () => router.replace("/choose-mode?for=tutorial");
  const finishTutorial = () => setIsTutorialFinish(true);
  const openTutorialLeaveMessageBox = () => setIsTutorialLeaveMessageBoxShow(true);
  const closeTutorialFinishMessageBox = () => setIsTutorialFinishBoxShow(false);
  const closeTutorialLeaveMessageBox = () => setIsTutorialLeaveMessageBoxShow(false);
  const RelatiTutorial = RelatiTutorialFromSize[size];

  const leaveTutorial = () => {
    if (game.turn && !isTutorialFinish) {
      openTutorialLeaveMessageBox();
    }
    else {
      leavePage();
    }
  };

  return (
    <Page id="how-to-play" title="how to play">
      <RelatiTutorial
        game={game}
        scene={scene}
        onFinish={finishTutorial}
        {...effectSetting}
        {...tutorialSetting} />

      <Button.Group>
        <IconButton type="leave" color="#888" title="離開" onClick={leaveTutorial} />
      </Button.Group>

      <LeaveMessageBox
        show={isTutorialLeaveMessageBoxShow}
        onCancel={closeTutorialLeaveMessageBox}
        onAccept={leavePage}
        onReject={closeTutorialLeaveMessageBox} />

      <FinishMessageBox
        game={game}
        show={isTutorialFinish && isTutorialFinishBoxShow}
        onCancel={closeTutorialFinishMessageBox}
        onVerify={leavePage} />
    </Page>
  );
};

HowToPlay.getInitialProps = async ({ query: { scene, on: size } }) => {
  return {
    size: parseInt((size as string)?.replace("x", "") || "5"),
    scene: scene as string,
  };
};

export default HowToPlay;
