import { MessageBox, Button, IconButton, MessageBoxProps, RelatiPiece } from "../../components";
import { RelatiGame, RelatiSymbols } from "../../libraries";

export interface Props extends MessageBoxProps {
  game: RelatiGame;
  onRetry?: () => void;
  onLeave?: () => void;
  onDownload?: () => void;
}

const GameOverMessageBox = ({ show: isShow, game, onCancel: handleCancel, onRetry: handleRetry, onLeave: handleLeave, onDownload: handleDownload }: Props) => {
  if (!isShow || !game.isOver) {
    return <></>;
  }

  const messageText =
    game.winner !== -1
      ? `${game.turn % 2 ? "藍" : "紅"}方玩家獲勝!`
      : "平手!";

  return (
    <MessageBox onCancel={handleCancel}>
      <div className="message-container">
        <div className="message-icon">
          <svg width="5" height="5">
            <RelatiPiece x={0} y={0} symbol={RelatiSymbols[game.winner] || "N"} primary />
          </svg>
        </div>
        {messageText}
      </div>
      <Button.Group>
        <IconButton type="retry" color="crimson" onClick={handleRetry} />
        <IconButton type="download" color="#888" onClick={handleDownload} />
        <IconButton type="leave" color="royalblue" onClick={handleLeave} />
      </Button.Group>
    </MessageBox>
  );
};

export default GameOverMessageBox;
