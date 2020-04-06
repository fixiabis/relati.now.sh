import React, { useState } from "react";
import { useRouter } from "next/router";

import "../styles/how-to-play.scss";
import { Page, Board, Piece, Button, IconButton } from "../components";

const HowToPlay = () => {
  const router = useRouter();

  return (
    <Page id="how-to-play" title="How to play">
      <Board width={9} height={9}>
        <Piece.SymbolO x={0} y={0} />
        <Piece.SymbolO x={1} y={0} isInitial />
        <Piece.SymbolO x={2} y={0} isDisabled />
        <Piece.SymbolX x={0} y={1} />
        <Piece.SymbolX x={1} y={1} isInitial />
        <Piece.SymbolX x={2} y={1} isDisabled />
        <Piece.HighLight x={4} y={4} color="crimson" />
      </Board>
      <Button.Group>
        <IconButton type="leave" color="#888" onClick={() => router.push("/")} />
      </Button.Group>
    </Page>
  );
};

export default HowToPlay;
