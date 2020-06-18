import { MessageBox, Button, IconButton, MessageBoxProps } from "../..";

export interface Props extends MessageBoxProps {
  message: string;
  onRetry?: () => void;
  onLeave?: () => void;
}

const RelatiPuzzleLevelFailedMessageBox = ({ show: isShow = true, message: messageText, onCancel: handleCancel, onRetry: handleRetry, onLeave: handleLeave }: Props) => {
  const messageIconStyle = { backgroundImage: "url(/icons/help.svg)" };

  if (!isShow) {
    return <></>;
  }

  return (
    <MessageBox onCancel={handleCancel}>
      <div className="message-container">
        <div className="message-icon" style={messageIconStyle} />
        {messageText}
      </div>
      <Button.Group>
        <IconButton type="retry" color="crimson" onClick={handleRetry} />
        <IconButton type="leave" color="royalblue" onClick={handleLeave} />
      </Button.Group>
    </MessageBox>
  );
};

export default RelatiPuzzleLevelFailedMessageBox;
