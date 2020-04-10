import React from "react";
import { useRouter } from "next/router";

import "../styles/play.scss";
import { Page, Button, IconButton, RelatiGame } from "../components";

const HowToPlay = () => {
  const router = useRouter();

  return (
    <Page id="play" title="Play">
      <RelatiGame />
      <Button.Group>
        <IconButton type="leave" color="#888" onClick={() => router.push("/")} />
      </Button.Group>
    </Page>
  );
};

export default HowToPlay;
