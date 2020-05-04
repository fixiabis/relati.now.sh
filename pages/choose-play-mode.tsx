import React from "react";
import { useRouter } from "next/router";
import { Page, Button, IconButton } from "../components";

const ChoosePlayMode = () => {
  const router = useRouter();
  const toPlayLitePage = () => router.replace("/play-lite");
  const toPlayPage = () => router.replace("/play");

  return (
    <Page id="choose-play-mode" title="choose play mode">
      <div className="choose-play-mode-control">
        請選擇模式遊玩
        <Button.Group>
          <IconButton type="x5" color="seagreen" onClick={toPlayLitePage} />
          <IconButton type="x9" color="crimson" onClick={toPlayPage} />
        </Button.Group>
      </div>
    </Page>
  );
};

export default ChoosePlayMode;
