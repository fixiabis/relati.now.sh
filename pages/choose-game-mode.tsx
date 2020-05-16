import React from "react";
import { useRouter } from "next/router";
import { Page, Button, IconButton } from "../components";

const ChooseGameMode = () => {
  const router = useRouter();
  const leavePage = () => router.replace("/");
  const toPlay2POnX5Page = () => router.replace("/play-2p-on-x5");
  const toPlay2POnX9Page = () => router.replace("/play-2p-on-x9");

  return (
    <Page id="choose-game-mode" title="choose game mode">
      <div className="choose-game-mode-control">
        <div className="play-icon" />
        請選擇模式
        <Button.Group>
          <IconButton type="x5" color="royalblue" className="with-text" onClick={toPlay2POnX5Page}>
            單機雙人
          </IconButton>
          <IconButton type="x9" color="crimson" className="with-text" onClick={toPlay2POnX9Page}>
            單機雙人
          </IconButton>
        </Button.Group>
      </div>

      <Button.Group>
        <IconButton type="leave" color="#888" title="離開" onClick={leavePage} />
      </Button.Group>
    </Page>
  );
};

export default ChooseGameMode;
