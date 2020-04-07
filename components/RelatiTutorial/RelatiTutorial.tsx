import React, { useState, Component } from "react";
import * as Piece from "../Piece";
import { AnyProps } from "../../types";
import Board from "../Board";

const RelatiTutorial = () => {
    const [state, setState] = useState({
        progress: -1,
        pieces: [] as JSX.Element[]
    });

    let progress = state.progress;
    let pieces = state.pieces;

    const placePiece = (Component: (props: AnyProps) => JSX.Element) => (props: AnyProps) => {
        const i = props.y * 9 + props.x;
        const piece = <Component key={i} {...props} />
        progress++;
        pieces[i] = piece;
        setState({ pieces: [...pieces], progress });
    };

    const scenes: (() => (((coordinate?: { x: number, y: number }) => void) | any))[] = [
        () => placePiece(Piece.Focus)({ x: 4, y: 4, color: "crimson" }),
        () => ({ x, y }) => {
            if (x === 4 && y === 4) {
                placePiece(Piece.SymbolO)({ x: 4, y: 4, primary: true });
            }
        },
        () => setTimeout(() => placePiece(Piece.SymbolX)({ x: 5, y: 4, primary: true }), 1000)
    ];

    return (
        <>
            <div className="description"></div>
            <Board width={9} height={9} onGridClick={scenes[state.progress + 1]?.()}>
                {state.pieces}
            </Board>
        </>
    );
};

export default RelatiTutorial;
