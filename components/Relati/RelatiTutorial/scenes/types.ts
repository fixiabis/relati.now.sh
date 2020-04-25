import { RelatiBoardProps } from "../../RelatiBoard";

type OmittedRelatiBoardPropKeys =
  | "lastPieceCoordinate"
  | "symbolOfPreviousPlayer"
  | "symbolOfCurrentPlayer";

export interface Props extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
    nextStep: () => void;
}
