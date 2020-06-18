import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Game, { RelatiGameRule, RelatiGameRuleX5, RelatiGameRuleX7, RelatiGameRuleX9 } from "../libraries/RelatiGame";
import { Page, Button, IconButton, RelatiPuzzleX5, RelatiPuzzleComponent } from "../components";
import { State, SettingState } from "../container/store";
import { PuzzleLeaveMessageBox, PuzzleFinishMessageBox } from "../page-components/strategies";

const gameRuleFromSize: Record<string, RelatiGameRule> = {
  "x5": RelatiGameRuleX5,
  "x7": RelatiGameRuleX7,
  "x9": RelatiGameRuleX9,
};

const RelatiPuzzleFromSize: Record<string, RelatiPuzzleComponent> = {
  "x5": RelatiPuzzleX5,
};

export interface Props {
  size?: string;
  level?: string;
}

const Strategies: NextPage<Props> = ({ size = "x5", level = "1" }) => {
  const router = useRouter();
  const gameRule = gameRuleFromSize[size] || RelatiGameRuleX5;
  const game = useRef<Game>(new Game(2, gameRule)).current;
  const [isPuzzleFinish, setIsPuzzleFinish] = useState(false);
  const [isPuzzleFinishBoxOpen, setIsPuzzleFinishBoxOpen] = useState(true);
  const [isPuzzleLeaveMessageBoxOpen, setIsPuzzleLeaveMessageBoxOpen] = useState(false);
  const effectSetting = useSelector<State, SettingState["effect"]>(state => state.setting.effect);
  const tutorialSetting = useSelector<State, SettingState["tutorial"]>(state => state.setting.tutorial);
  const leavePage = () => router.replace("/choose-mode?for=tutorial");
  const finishPuzzle = () => setIsPuzzleFinish(true);
  const openPuzzleLeaveMessageBox = () => setIsPuzzleLeaveMessageBoxOpen(true);
  const closePuzzleFinishMessageBox = () => setIsPuzzleFinishBoxOpen(false);
  const closePuzzleLeaveMessageBox = () => setIsPuzzleLeaveMessageBoxOpen(false);
  const RelatiPuzzle = RelatiPuzzleFromSize[size] || RelatiPuzzleX5;

  const leavePuzzle = () => {
    if (game.turn && !isPuzzleFinish) {
      openPuzzleLeaveMessageBox();
    }
    else {
      leavePage();
    }
  };

  return (
    <Page id="strategies" title="strategies">
      <RelatiPuzzle
        game={game}
        level={level}
        onFinish={finishPuzzle}
        {...effectSetting}
        {...tutorialSetting} />

      <PuzzleLeaveMessageBox
        show={isPuzzleLeaveMessageBoxOpen}
        onCancel={closePuzzleLeaveMessageBox}
        onAccept={leavePage}
        onReject={closePuzzleLeaveMessageBox} />

      <PuzzleFinishMessageBox
        game={game}
        show={isPuzzleFinish && isPuzzleFinishBoxOpen}
        onCancel={closePuzzleFinishMessageBox}
        onVerify={leavePage} />

      <Button.Group>
        <IconButton type="leave" color="#888" title="離開" onClick={leavePuzzle} />
      </Button.Group>
    </Page>
  );
};

Strategies.getInitialProps = async ({ query: { level, on: size } }) => {
  return {
    size: size as string | undefined,
    level: level as string | undefined,
  };
};

export default Strategies;
