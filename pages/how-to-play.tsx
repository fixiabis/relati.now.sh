import React from "react";
import { useRouter } from "next/router";

import "../styles/how-to-play.scss";
import { Page, Button, IconButton, RelatiTutorial } from "../components";

const HowToPlay = () => {
  const router = useRouter();

  return (
    <Page id="how-to-play" title="How to play">
      <RelatiTutorial />
      <Button.Group>
        <IconButton type="leave" color="#888" onClick={() => router.push("/")} />
      </Button.Group>
    </Page>
  );
};

export default HowToPlay;
