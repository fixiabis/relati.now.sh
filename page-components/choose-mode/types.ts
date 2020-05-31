import { PageProps } from "../../components";
import { NextRouter } from "next/router";

type OmittedPagePropKeys =
    | "title";

export interface ChooseModePageProps extends Omit<PageProps, OmittedPagePropKeys> {
    router: NextRouter;
    leavePage: () => void;
}

export type ChooseModePageComponent<Super = React.FunctionComponent<ChooseModePageProps>> = Super & {

};
