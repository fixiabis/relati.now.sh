import { MessageBox, Button, IconButton, MessageBoxProps, RelatiPiece } from "../../components";
import { RelatiGame, RelatiSymbols } from "../../libraries";

export interface Props extends MessageBoxProps {
  game: RelatiGame;
  onVerify?: () => void;
}

const PuzzleFinishMessageBox = ({ show: isShow = true, game, onCancel: handleCancel, onVerify: handleVerify }: Props) => {
  if (!isShow) {
    return <></>;
  }

  return (
    <MessageBox onCancel={handleCancel}>
      <div className="message-container">
        <div className="message-icon-container">
          <svg width="5" height="5" className="message-icon">
            <RelatiPiece x={0} y={0} symbol={RelatiSymbols[game.winner] || "N"} primary />
          </svg>
        </div>
        恭喜你完成所有關卡!
      </div>
      <Button.Group>
        <IconButton type="verify" color="seagreen" onClick={handleVerify} />
      </Button.Group>
    </MessageBox>
  );
};

export default PuzzleFinishMessageBox;
