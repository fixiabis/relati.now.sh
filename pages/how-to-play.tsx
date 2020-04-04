import React from "react";
import { useRouter } from "next/router";

import "../styles/how-to-play.scss";
import { Page, Board, Button } from "../components";

const HowToPlay = () => {
  const router = useRouter();

  return (
    <Page id="how-to-play" title="How to play">
      <Board width={9} height={9} />
      <Button.Group>
        <Button style={{
          backgroundColor: "#888",
          backgroundImage: "url(/icons/leave.svg)"
        }} onClick={() => router.push("/")} />
      </Button.Group>
    </Page>
  );
};

export default HowToPlay;
