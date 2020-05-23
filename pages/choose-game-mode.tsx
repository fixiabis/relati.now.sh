import React from "react";
import { useRouter } from "next/router";
import { Page, Button, IconButton } from "../components";

const ChooseGameMode = () => {
  const router = useRouter();
  const leavePage = () => router.replace("/");
  const toPlay2pOnX5Page = () => router.replace("/play?2p&on=x5");
  const toPlay2pOnX7Page = () => router.replace("/play?2p&on=x7");
  const toPlay2pOnX9Page = () => router.replace("/play?2p&on=x9");
  const toPlay1pOnX5WithOPage = () => router.replace("/play?1p&on=x5&with=o");
  const toPlay1pOnX7WithOPage = () => router.replace("/play?1p&on=x7&with=o");
  const toPlay1pOnX9WithOPage = () => router.replace("/play?1p&on=x9&with=o");
  const toPlay1pOnX5WithXPage = () => router.replace("/play?1p&on=x5&with=x");
  const toPlay1pOnX7WithXPage = () => router.replace("/play?1p&on=x7&with=x");
  const toPlay1pOnX9WithXPage = () => router.replace("/play?1p&on=x9&with=x");

  return (
    <Page id="choose-game-mode" title="choose game mode">
      <div className="choose-game-mode-control">
        <div className="play-icon" />
        請選擇模式
        <Button.Group>
          <IconButton type="x5" color="royalblue" className="with-text" onClick={toPlay2pOnX5Page}>
            單機雙人
          </IconButton>
          <IconButton type="x5" color="royalblue" className="with-text">
            線上雙人
          </IconButton>
          <IconButton type="x5" color="#888" className="with-text" onClick={toPlay1pOnX5WithXPage}>
            單機先攻
          </IconButton>
          <IconButton type="x5" color="#888" className="with-text" onClick={toPlay1pOnX5WithOPage}>
            單機後攻
          </IconButton>
          <IconButton type="x7" color="seagreen" className="with-text" onClick={toPlay2pOnX7Page}>
            單機雙人
          </IconButton>
          <IconButton type="x7" color="seagreen" className="with-text">
            線上雙人
          </IconButton>
          <IconButton type="x7" color="#888" className="with-text" onClick={toPlay1pOnX7WithXPage}>
            單機先攻
          </IconButton>
          <IconButton type="x7" color="#888" className="with-text" onClick={toPlay1pOnX7WithOPage}>
            單機後攻
          </IconButton>
          <IconButton type="x9" color="crimson" className="with-text" onClick={toPlay2pOnX9Page}>
            單機雙人
          </IconButton>
          <IconButton type="x9" color="crimson" className="with-text">
            線上雙人
          </IconButton>
          <IconButton type="x9" color="#888" className="with-text" onClick={toPlay1pOnX9WithXPage}>
            單機先攻
          </IconButton>
          <IconButton type="x9" color="#888" className="with-text" onClick={toPlay1pOnX9WithOPage}>
            單機後攻
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
