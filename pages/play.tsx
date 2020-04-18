import React from "react";
import { useRouter } from "next/router";
import { Page, Button, IconButton, RelatiGame } from "../components";
import { useSelector } from "react-redux";
import { State } from "../reducers";

const Play = () => {
  const router = useRouter();
  const gamePlacementEffect = true;
  const gameDrawLineDuration = useSelector<State, number>(state => state.setting.drawLineDuration);

  return (
    <Page id="play" title="Play">
      <div className="versus-header">
        <div className="player-o" />
        <div className="versus" />
        <div className="player-x" />
      </div>
      <RelatiGame drawLineDuration={gameDrawLineDuration} placementEffect={gamePlacementEffect} onLeave={() => router.replace("/")} />
      <Button.Group>
        <IconButton type="leave" color="#888" onClick={() => router.replace("/")} />
      </Button.Group>
    </Page>
  );
};

export default Play;
