import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Page from "../components/Page";
import Button from "../components/Button";
import "../styles/index.scss";
import { State } from "../reducers/rootReducer";

const Main = () => {
  const router = useRouter();
  const noAnimation = !useSelector<State>(state => state.page.main.animation);
  const buttonGroupClassName = noAnimation ? "no-animation" : "";

  return (
    <Page id="main" title="relati">
      <div className="logo" />
      <Button.Group className={buttonGroupClassName}>
        <Button style={{
          backgroundColor: "crimson",
          backgroundImage: "url(/icons/play.svg)"
        }} />

        <Button style={{
          backgroundColor: "royalblue",
          backgroundImage: "url(/icons/help.svg)"
        }} onClick={() => router.push("/how-to-play")} />
      </Button.Group>
    </Page>
  );
};

export default Main;