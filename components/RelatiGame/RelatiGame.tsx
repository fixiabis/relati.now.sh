import React, { useState } from "react";

import Board from "../Board";

export type Scene = {
    pieces: JSX.Element[],
    hints: JSX.Element[],
    effectLines: JSX.Element[],
}

const RelatiTutorial = () => {
    const [board, setBoard] = useState<Scene>({
        pieces: [] as JSX.Element[],
        hints: [] as JSX.Element[],
        effectLines: [] as JSX.Element[]
    });

    let { pieces, hints, effectLines } = board;

    return (
        <>
            <div className="versus-header">
                <div className="player-o"></div>
                <div className="versus"></div>
                <div className="player-x"></div>
            </div>
            <Board id="relati-tutorial" width={9} height={9}>
                {board.effectLines}
                {board.pieces}
                {board.hints}
            </Board>
        </>
    );
};

export default RelatiTutorial;
