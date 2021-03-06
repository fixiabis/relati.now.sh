import { Page, Button, IconButton } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { State, UserState, signUserIn, setUserInfo } from "../../container/store";
import { ChooseModePageComponent } from "./types";
import { useEffect, useState } from "react";
import firebase from "../../container/firebase";

const ChooseModeForSignIn: ChooseModePageComponent = ({ router, leavePage }) => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const playerInfo = useSelector<State, UserState["userInfo"]>(state => state.user.userInfo);
  const toMainPage = () => router.replace("/");

  if (playerInfo) {
    leavePage();
  }

  const signInWithFacebook = () => dispatch(signUserIn("facebook"));
  const signInWithGoogle = () => dispatch(signUserIn("google"));

  useEffect(() => {
    firebase.auth().getRedirectResult().then(({ user: player }) => {
      if (!player) {
        return setIsSignIn(false);
      }

      const playerInfo = {
        playerId: player.uid,
        name: player.displayName,
        avatarUrl: player.photoURL,
      };

      dispatch(setUserInfo(playerInfo));
    })
  });

  useEffect(() => firebase.auth().onAuthStateChanged(player => {
    if (!player) {
      return setIsSignIn(false);
    }

    const playerInfo = {
      playerId: player.uid,
      name: player.displayName,
      avatarUrl: player.photoURL,
    };

    dispatch(setUserInfo(playerInfo));
  }));

  if (isSignIn) {
    return <Page id="choose-mode" title="check signed in..." />;
  }

  return (
    <Page id="choose-mode" title="choose sign in mode">
      <div className="choose-mode-control">
        <div className="main-icon" style={{ backgroundImage: `url(/icons/play.svg)` }} />
        請選擇登入方式
        <Button.Group>
          <IconButton type="facebook" color="royalblue" onClick={signInWithFacebook} title="用facebook登入" />
          <IconButton type="google" color="crimson" onClick={signInWithGoogle} title="用google登入" />
        </Button.Group>
      </div>
      <Button.Group>
        <IconButton type="leave" color="#888" title="離開" onClick={toMainPage} />
      </Button.Group>
    </Page>
  );
};

export default ChooseModeForSignIn;
