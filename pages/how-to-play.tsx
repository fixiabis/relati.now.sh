import React from "react";
import { useRouter } from "next/router";

import "../styles/how-to-play.scss";
import { Page, Board, Piece, Button, IconButton } from "../components";

const HowToPlay = () => {
  const router = useRouter();

  return (
    <Page id="how-to-play" title="How to play">
      <Board width={9} height={9}>
        <Piece.SymbolO x={0} y={0} />
        <Piece.SymbolO x={1} y={0} primary />
        <Piece.SymbolO x={2} y={0} disabled />
        <Piece.SymbolX x={0} y={1} />
        <Piece.SymbolX x={1} y={1} primary />
        <Piece.SymbolX x={2} y={1} disabled />
        <Piece.Focus x={4} y={4} color="crimson" />
        <Piece.Hint x={4} y={6} color="royalblue" />
      </Board>
      <Button.Group>
        <IconButton type="leave" color="#888" onClick={() => router.push("/")} />
      </Button.Group>
    </Page>
  );
};

export default HowToPlay;
