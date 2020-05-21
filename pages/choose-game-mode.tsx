import React from "react";
import { useRouter } from "next/router";
import { Page, Button, IconButton, RelatiPiece } from "../components";

const ChooseGameMode = () => {
  const router = useRouter();
  const leavePage = () => router.replace("/");
  const toPlay2pOnX5Page = () => router.replace("/play-2p-on-x5");
  const toPlay1pOnX5WithOPage = () => router.replace("/play-1p-on-x5-with-o-lv1");
  const toPlay1pOnX5WithXPage = () => router.replace("/play-1p-on-x5-with-x-lv1");
  const toPlay2pOnX9Page = () => router.replace("/play-2p-on-x9");

  return (
    <Page id="choose-game-mode" title="choose game mode">
      <div className="choose-game-mode-control">
        <div className="play-icon" />
        請選擇模式
        <Button.Group>
          <IconButton type="x5" color="royalblue" className="with-text" onClick={toPlay2pOnX5Page}>
            單機雙人
          </IconButton>
          <IconButton type="x5" color="royalblue" className="with-text" onClick={toPlay1pOnX5WithOPage}>
            單機對
            <svg width="5" height="5" style={{ transform: "scale(4)", marginLeft: 7.5 }}>
              <RelatiPiece x={0} y={0} symbol="O" primary />
            </svg>
          </IconButton>
          <IconButton type="x5" color="royalblue" className="with-text" onClick={toPlay1pOnX5WithXPage}>
            單機對
            <svg width="5" height="5" style={{ transform: "scale(4)", marginLeft: 7.5 }}>
              <RelatiPiece x={0} y={0} symbol="X" primary />
            </svg>
          </IconButton>
          <IconButton type="x9" color="crimson" className="with-text" onClick={toPlay2pOnX9Page}>
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
