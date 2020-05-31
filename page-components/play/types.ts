import { NextRouter } from "next/router";
import { PageProps } from "../../components";
import { RelatiGame } from "../../libraries";

type OmittedPagePropKeys =
    | "title";

export interface PlayGamePageProps extends Omit<PageProps, OmittedPagePropKeys> {
    router: NextRouter;
    size: string;
    game: RelatiGame;
    leaveGame: () => void;
}

export type PlayGamePageComponent<Super = React.FunctionComponent<PlayGamePageProps>> = Super & {

};
