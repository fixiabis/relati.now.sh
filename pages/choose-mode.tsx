import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Page, Button, IconButton } from "../components";

export interface Props {
  type: string;
}

const ChooseMode: NextPage<Props> = ({ type }) => {
  const router = useRouter();
  const leavePage = () => router.replace("/");

  if (type === "game") {
    const [size, setSize] = useState("");
    const removeSize = () => setSize("");

    const setSizeX5 = () => setSize("x5");
    const setSizeX7 = () => setSize("x7");
    const setSizeX9 = () => setSize("x9");
    const toPlayPage1pWithPlayerO = () => toPlayPageWithPlayer("o");
    const toPlayPage1pWithPlayerX = () => toPlayPageWithPlayer("x");

    const toPlayPageWithPlayer = (player: string) => {
      router.replace(`/play?1p&on=${size}&with=${player}`);
    };

    const toPlayPage2p = () => {
      router.replace(`/play?2p&on=${size}`);
    };

    if (!size) {
      return (
        <Page id="choose-mode" title="choose game mode">
          <div className="choose-mode-control">
            <div className="main-icon" style={{ backgroundImage: `url(/icons/play.svg)` }} />
          請選擇大小
          <Button.Group>
              <IconButton type="x5" color="royalblue" onClick={setSizeX5} title="5x5" />
              <IconButton type="x7" color="seagreen" onClick={setSizeX7} title="7x7" />
              <IconButton type="x9" color="crimson" onClick={setSizeX9} title="9x9" />
            </Button.Group>
          </div>
          <Button.Group>
            <IconButton type="leave" color="#888" title="離開" onClick={leavePage} />
          </Button.Group>
        </Page>
      );
    }
    else {
      return (
        <Page id="choose-mode" title="choose game mode">
          <div className="choose-mode-control">
            <div className="main-icon" style={{ backgroundImage: `url(/icons/${size}.svg)` }} />
          請選擇模式
          <Button.Group>
              <IconButton type="../player-o" color="#f2f2f2" onClick={toPlayPage1pWithPlayerX} title="先手" />
              <IconButton type="../player-x" color="#f2f2f2" onClick={toPlayPage1pWithPlayerO} title="後手" />
              <IconButton type="../online" color="#f2f2f2" onClick={toPlayPage2p} title="線上" />
            </Button.Group>
          </div>
          <Button.Group>
            <IconButton type="leave" color="#888" title="離開" onClick={removeSize} />
          </Button.Group>
        </Page>
      );
    }
  }
  else {
    const toHowToPlayPageOnX5 = () => router.replace("/how-to-play?on=x5");
    const toHowToPlayPageOnX7 = () => router.replace("/how-to-play?on=x7");
    const toHowToPlayPageOnX9 = () => router.replace("/how-to-play?on=x9");

    return (
      <Page id="choose-mode" title="choose tutorial mode">
        <div className="choose-mode-control">
          <div className="main-icon" style={{ backgroundImage: `url(/icons/help.svg)` }} />
          請選擇大小
          <Button.Group>
            <IconButton type="x5" color="royalblue" onClick={toHowToPlayPageOnX5} title="5x5" />
            <IconButton type="x7" color="seagreen" onClick={toHowToPlayPageOnX7} title="7x7" />
            <IconButton type="x9" color="crimson" onClick={toHowToPlayPageOnX9} title="9x9" />
          </Button.Group>
        </div>
        <Button.Group>
          <IconButton type="leave" color="#888" title="離開" onClick={leavePage} />
        </Button.Group>
      </Page>
    );
  }
};

ChooseMode.getInitialProps = async ({ query: { for: type } }) => {
  return { type: type as string || "game" };
};

export default ChooseMode;
