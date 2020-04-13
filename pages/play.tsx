import React from "react";
import { useRouter } from "next/router";

import { Page, Button, IconButton, RelatiGame } from "../components";

const Play = () => {
  const router = useRouter();

  return (
    <Page id="play" title="Play">
      <div className="versus-header">
        <div className="player-o" />
        <div className="versus" />
        <div className="player-x" />
      </div>
      <RelatiGame onOver={() => router.push("/")} />
      <Button.Group>
        <IconButton type="leave" color="#888" onClick={() => router.push("/")} />
      </Button.Group>
    </Page>
  );
};

export default Play;
