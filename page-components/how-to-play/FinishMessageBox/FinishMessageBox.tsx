import { MessageBox, Button, IconButton, MessageBoxProps, RelatiPiece } from "../../../components";
import { RelatiGame, RelatiSymbols } from "../../../libraries";

export interface Props extends MessageBoxProps {
  game: RelatiGame;
  onVerify?: () => void;
}

const FinishMessageBox = ({ show: isShow, game, onCancel: handleCancel, onVerify: handleVerify }: Props) => {
  if (!isShow || !game.isOver) {
    return <></>;
  }

  const messageIcon = (
    <div className="message-icon-container">
      <svg width="5" height="5" className="message-icon">
        <RelatiPiece x={0} y={0} symbol={RelatiSymbols[game.winner] || "N"} primary />
      </svg>
    </div>
  );

  const messageText = (
    game.winner !== -1
      ? `${game.winner ? "藍" : "紅"}方玩家獲勝!`
      : "平手!"
  ) + " 恭喜你完成教學!";

  return (
    <MessageBox onCancel={handleCancel}>
      <div className="message-container">
        {messageIcon}
        {messageText}
      </div>
      <Button.Group>
        <IconButton type="verify" color="seagreen" onClick={handleVerify} />
      </Button.Group>
    </MessageBox>
  );
};

export default FinishMessageBox;
