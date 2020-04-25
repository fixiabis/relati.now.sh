import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Page, Button, IconButton, RelatiTutorial } from "../components";
import { useSelector } from "react-redux";
import { State } from "../reducers";
import { SettingState } from "../reducers/setting";

export interface Props {
  step?: number;
}

const HowToPlay: NextPage<Props> = ({ step }) => {
  const router = useRouter();
  const tutorialSetting = useSelector<State, SettingState>(state => state.setting);

  return (
    <Page id="how-to-play" title="How to play">
      <RelatiTutorial step={step} {...tutorialSetting} />
      <Button.Group>
        <IconButton type="leave" color="#888" onClick={() => router.replace("/")} />
      </Button.Group>
    </Page>
  );
};

HowToPlay.getInitialProps = async ({ query }) => {
  return { step: parseInt(query.step as string) || 0 };
};

export default HowToPlay;
