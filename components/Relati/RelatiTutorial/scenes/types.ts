import { BoardProps } from "../../../Board";

export interface Props extends Omit<BoardProps, "width" | "height"> {
    nextStep: () => void;
}
