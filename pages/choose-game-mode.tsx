import React from "react";
import { useRouter } from "next/router";
import { Page, Button, IconButton } from "../components";

const ChooseGameMode = () => {
  const router = useRouter();
  const leavePage = () => router.replace("/");
  const toPlayLitePage = () => router.replace("/play-lite");
  const toPlayPage = () => router.replace("/play");

  return (
    <Page id="choose-play-mode" title="choose play mode">
      <div className="choose-play-mode-control">
        <div className="play-icon" />
        請選擇模式
        <Button.Group>
          <IconButton type="x5" color="royalblue" onClick={toPlayLitePage} />
          <IconButton type="x9" color="crimson" onClick={toPlayPage} />
          <IconButton type="leave" color="#888" onClick={leavePage} />
        </Button.Group>
      </div>
    </Page>
  );
};

export default ChooseGameMode;
