import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Game, { RelatiGameRule, RelatiGameRuleX5, RelatiGameRuleX7, RelatiGameRuleX9 } from "../libraries/RelatiGame";
import { Page, Button, IconButton, RelatiTutorialX5, RelatiTutorialX7, RelatiTutorialX9, RelatiTutorialComponent } from "../components";
import { State, SettingState } from "../container/store";
import { TutorialLeaveMessageBox, TutorialFinishMessageBox } from "../page-components/how-to-play";

const gameRuleFromSize: Record<string, RelatiGameRule> = {
  "x5": RelatiGameRuleX5,
  "x7": RelatiGameRuleX7,
  "x9": RelatiGameRuleX9,
};

const RelatiTutorialFromSize: Record<string, RelatiTutorialComponent> = {
  "x5": RelatiTutorialX5,
  "x7": RelatiTutorialX7,
  "x9": RelatiTutorialX9,
};

export interface Props {
  size?: string;
  scene?: string;
}

const HowToPlay: NextPage<Props> = ({ size = "x5", scene = "1" }) => {
  const router = useRouter();
  const gameRule = gameRuleFromSize[size] || RelatiGameRuleX5;
  const game = useRef<Game>(new Game(2, gameRule)).current;
  const [isTutorialFinish, setIsTutorialFinish] = useState(false);
  const [isTutorialFinishBoxOpen, setIsTutorialFinishBoxOpen] = useState(true);
  const [isTutorialLeaveMessageBoxOpen, setIsTutorialLeaveMessageBoxOpen] = useState(false);
  const effectSetting = useSelector<State, SettingState["effect"]>(state => state.setting.effect);
  const tutorialSetting = useSelector<State, SettingState["tutorial"]>(state => state.setting.tutorial);
  const leavePage = () => router.replace("/choose-mode?for=tutorial");
  const finishTutorial = () => setIsTutorialFinish(true);
  const openTutorialLeaveMessageBox = () => setIsTutorialLeaveMessageBoxOpen(true);
  const closeTutorialFinishMessageBox = () => setIsTutorialFinishBoxOpen(false);
  const closeTutorialLeaveMessageBox = () => setIsTutorialLeaveMessageBoxOpen(false);
  const RelatiTutorial = RelatiTutorialFromSize[size] || RelatiTutorialX5;

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

      <TutorialLeaveMessageBox
        show={isTutorialLeaveMessageBoxOpen}
        onCancel={closeTutorialLeaveMessageBox}
        onAccept={leavePage}
        onReject={closeTutorialLeaveMessageBox} />

      <TutorialFinishMessageBox
        game={game}
        show={isTutorialFinish && isTutorialFinishBoxOpen}
        onCancel={closeTutorialFinishMessageBox}
        onVerify={leavePage} />

      <Button.Group>
        <IconButton type="leave" color="#888" title="離開" onClick={leaveTutorial} />
      </Button.Group>
    </Page>
  );
};

HowToPlay.getInitialProps = async ({ query: { scene, on: size } }) => {
  return {
    size: size as string | undefined,
    scene: scene as string | undefined,
  };
};

export default HowToPlay;
