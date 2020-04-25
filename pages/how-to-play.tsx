import React from "react";
import { useRouter } from "next/router";
import { Page, Button, IconButton, RelatiTutorial } from "../components";
import { useSelector } from "react-redux";
import { State } from "../reducers";
import { SettingState } from "../reducers/setting";

const HowToPlay = () => {
  const router = useRouter();
  const tutorialSetting = useSelector<State, SettingState>(state => state.setting);

  return (
    <Page id="how-to-play" title="How to play">
      <RelatiTutorial {...tutorialSetting} />
      <Button.Group>
        <IconButton type="leave" color="#888" onClick={() => router.replace("/")} />
      </Button.Group>
    </Page>
  );
};

export default HowToPlay;
