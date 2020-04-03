import React, { createRef, useState, useEffect, ReactNode, RefObject } from "react";
import "./index.scss";

export type Props = {
    [otherProp: string]: any,
    width: number,
    height: number,
    children?: ReactNode,
    className?: string,
    onBoardClick?: (e: React.MouseEvent) => void;
    onGridClick?: ({ x, y }: { x: number, y: number }) => void,
    ref?: RefObject<HTMLDivElement>,
};

const Board = ({ width, height, children, className, onGridClick, ref, ...props }: Props) => {
    const horizonLines = [];
    const verticalLines = [];
    const viewWidth = width * 5;
    const viewHeight = height * 5;
    const [scale, setScale] = useState(1);
    const classNames = className ? className.split(" ") : [];
    const boardContainer = ref || createRef<HTMLDivElement>();

    const boardStyle = {
        width: viewWidth,
        height: viewHeight,
        transform: `scale(${scale})`
    };

    classNames.push("board-container");

    for (let x = 1; x < height; x++) {
        horizonLines.push(
            <path key={x} d={`M 0 ${x * 5} H ${viewWidth}`} />
        );
    }

    for (let y = 1; y < width; y++) {
        verticalLines.push(
            <path key={y} d={`M ${y * 5} 0 V ${viewHeight}`} />
        );
    }

    function setScaleByMeasurement() {
        const containerWidth = boardContainer.current.offsetWidth;
        const containerHeight = boardContainer.current.offsetHeight;

        const scale = Math.min(
            containerWidth / viewWidth,
            containerHeight / viewHeight
        ) * 0.95;

        setScale(scale);
    }

    useEffect(() => {
        setScaleByMeasurement();
        window.addEventListener("resize", setScaleByMeasurement);
        return () => window.removeEventListener("resize", setScaleByMeasurement);
    });

    const onBoardClick = (e: React.MouseEvent) => {
        const { offsetX, offsetY } = e.nativeEvent;
        const x = Math.floor(offsetX / 5);
        const y = Math.floor(offsetY / 5);
        if (props.onBoardClick) onBoardClick(e);
        if (onGridClick) onGridClick({ x, y });
    };

    return (
        <div {...props} className={classNames.join(" ")} ref={boardContainer}>
            <div className="board" style={boardStyle} onClick={onBoardClick}>
                <svg width={viewWidth} height={viewHeight}>
                    {children}
                    <g className="grid-lines" stroke="#888" strokeWidth="0.4">
                        {horizonLines}
                        {verticalLines}
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default Board;
