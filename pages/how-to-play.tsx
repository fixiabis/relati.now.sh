import React, { useState } from "react";
import { useRouter } from "next/router";

import "../styles/how-to-play.scss";
import { Page, Board, Button, IconButton } from "../components";

const HowToPlay = () => {
  const router = useRouter();
  const [progress, setProgess] = useState(0);

  return (
    <Page id="how-to-play" title="How to play">
      <Board width={9} height={9}>
        <path d="
          M 21 21 m  0  1 v -1 h  1
          M 21 24 m  0 -1 v  1 h  1
          M 24 21 m  0  1 v -1 h -1
          M 24 24 m  0 -1 v  1 h -1
        " stroke="crimson" stroke-width="0.4px" fill="none" style={{
          animation: "point-highlight 1s infinite"
        }}></path>
      </Board>
      <Button.Group>
        <IconButton type="leave" color="#888" onClick={() => router.push("/")} />
      </Button.Group>
    </Page>
  );
};

export default HowToPlay;
