import { MessageBox, Button, IconButton, MessageBoxProps } from "../../components";

export interface Props extends MessageBoxProps {
  onAccept?: () => void;
  onReject?: () => void;
  onDownload?: () => void;
}

const GameLeaveMessageBox = ({ show: isShow, onCancel: handleCancel, onAccept: handleAccept, onReject: handleReject, onDownload: handleDownload }: Props) => {
  const messageIconStyle = { backgroundImage: "url(/icons/help.svg)" };

  if (!isShow) {
    return <></>;
  }

  return (
    <MessageBox onCancel={handleCancel}>
      <div className="message-container">
        <div className="message-icon" style={messageIconStyle} />
        勝負未分, 確定離開?
      </div>
      <Button.Group>
        <IconButton type="accept" color="crimson" onClick={handleAccept} />
        <IconButton type="download" color="#888" onClick={handleDownload} />
        <IconButton type="reject" color="royalblue" onClick={handleReject} />
      </Button.Group>
    </MessageBox>
  );
};

export default GameLeaveMessageBox;
