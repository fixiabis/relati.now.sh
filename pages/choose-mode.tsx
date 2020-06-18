import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChooseModePageComponent, ChooseModeForGame, ChooseModeForTutorial, ChooseModeForSignIn, ChooseModeForPuzzle } from "../page-components/choose-mode";

const ChooseModePageFromType: Record<string, ChooseModePageComponent> = {
  "game": ChooseModeForGame,
  "tutorial": ChooseModeForTutorial,
  "sign-in": ChooseModeForSignIn,
  "puzzle": ChooseModeForPuzzle,
};

export interface Props {
  type?: string;
  redirect?: string;
}

const ChooseMode: NextPage<Props> = ({ type = "game", redirect = "/" }) => {
  const router = useRouter();
  const leavePage = () => router.replace(redirect);
  const ChooseModePage = ChooseModePageFromType[type] || ChooseModeForGame;
  return <ChooseModePage router={router} leavePage={leavePage} />
};

ChooseMode.getInitialProps = async ({ query: { for: type, then: redirect } }) => {
  return {
    type: type as string | undefined,
    redirect: redirect as string | undefined,
  };
};

export default ChooseMode;
