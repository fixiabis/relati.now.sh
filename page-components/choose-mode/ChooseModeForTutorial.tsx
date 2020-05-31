import { Page, Button, IconButton } from "../../components";
import { ChooseModePageComponent } from "./types";

const ChooseModeForTutorial: ChooseModePageComponent = ({ router, leavePage }) => {
  const toHowToPlayPageOnX5 = () => router.replace("/how-to-play?on=x5");
  const toHowToPlayPageOnX7 = () => router.replace("/how-to-play?on=x7");
  const toHowToPlayPageOnX9 = () => router.replace("/how-to-play?on=x9");

  return (
    <Page id="choose-mode" title="choose tutorial mode">
      <div className="choose-mode-control">
        <div className="main-icon" style={{ backgroundImage: `url(/icons/help.svg)` }} />
          請選擇棋盤大小
          <Button.Group>
          <IconButton type="x5" color="royalblue" onClick={toHowToPlayPageOnX5} title="5x5" />
          <IconButton type="x7" color="seagreen" onClick={toHowToPlayPageOnX7} title="7x7" />
          <IconButton type="x9" color="crimson" onClick={toHowToPlayPageOnX9} title="9x9" />
        </Button.Group>
      </div>
      <Button.Group>
        <IconButton type="leave" color="#888" title="離開" onClick={leavePage} />
      </Button.Group>
    </Page>
  );
};

export default ChooseModeForTutorial;
