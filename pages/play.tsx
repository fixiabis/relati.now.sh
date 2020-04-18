import React from "react";
import { useRouter } from "next/router";
import { Page, Button, IconButton, RelatiGame } from "../components";
import { useSelector } from "react-redux";
import { State } from "../reducers";
import { SettingState } from "../reducers/setting";

const Play = () => {
  const router = useRouter();
  const {
    placementEffect: gamePlacementEffect,
    drawLineDuration: gameDrawLineDuration,
    lastPieceEmphasized: gameLastPieceEmphasized,
  } = useSelector<State, SettingState>(state => state.setting);

  return (
    <Page id="play" title="Play">
      <div className="versus-header">
        <div className="player-o" />
        <div className="versus" />
        <div className="player-x" />
      </div>

      <RelatiGame
        drawLineDuration={gameDrawLineDuration}
        placementEffect={gamePlacementEffect}
        lastPieceEmphasized={gameLastPieceEmphasized}
        onLeave={() => router.replace("/")} />

      <Button.Group>
        <IconButton type="leave" color="#888" onClick={() => router.replace("/")} />
      </Button.Group>
    </Page>
  );
};

export default Play;
