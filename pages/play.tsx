import React from "react";
import { useRouter } from "next/router";

import { Page, Button, IconButton, RelatiGame } from "../components";

const Play = () => {
  const router = useRouter();

  return (
    <Page id="play" title="Play">
      <RelatiGame onClose={() => router.push("/")} />
      <Button.Group>
        <IconButton type="leave" color="#888" onClick={() => router.push("/")} />
      </Button.Group>
    </Page>
  );
};

export default Play;
