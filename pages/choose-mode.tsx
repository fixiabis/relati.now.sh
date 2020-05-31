import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChooseModePageComponent, ChooseModeForGame, ChooseModeForTutorial, ChooseModeForSignIn } from "../page-components/choose-mode";

const ChooseModePageFromType: Record<string, ChooseModePageComponent> = {
  "game": ChooseModeForGame,
  "tutorial": ChooseModeForTutorial,
  "sign-in": ChooseModeForSignIn,
};

export interface Props {
  type?: string;
}

const ChooseMode: NextPage<Props> = ({ type = "game" }) => {
  const router = useRouter();
  const leavePage = () => router.replace("/");
  const ChooseModePage = ChooseModePageFromType[type] || ChooseModeForGame;
  return <ChooseModePage router={router} leavePage={leavePage} />
};

ChooseMode.getInitialProps = async ({ query: { for: type } }) => {
  return { type: type as string | undefined };
};

export default ChooseMode;
