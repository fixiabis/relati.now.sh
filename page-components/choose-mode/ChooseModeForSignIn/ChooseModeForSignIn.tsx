import { Page, Button, IconButton } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { State, UserState, signUserIn } from "../../../container/store";
import { ChooseModePageComponent } from "../types";

const ChooseModeForSignIn: ChooseModePageComponent = ({ router, leavePage }) => {
  const dispatch = useDispatch();
  const playerInfo = useSelector<State, UserState["userInfo"]>(state => state.user.userInfo);

  if (playerInfo) {
    leavePage();
  }

  const signInWithFacebook = () => dispatch(signUserIn("facebook"));
  const signInWithGoogle = () => dispatch(signUserIn("google"));

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
        <IconButton type="leave" color="#888" title="離開" onClick={leavePage} />
      </Button.Group>
    </Page>
  );
};

export default ChooseModeForSignIn;
