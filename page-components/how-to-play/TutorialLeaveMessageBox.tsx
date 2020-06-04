import { MessageBox, Button, IconButton, MessageBoxProps } from "../../components";

export interface Props extends MessageBoxProps {
  onAccept?: () => void;
  onReject?: () => void;
}

const LeaveMessageBox = ({ show: isShow = true, onCancel: handleCancel, onAccept: handleAccept, onReject: handleReject }: Props) => {
  const messageIconStyle = { backgroundImage: "url(/icons/help.svg)" };

  if (!isShow) {
    return <></>;
  }

  return (
    <MessageBox onCancel={handleCancel}>
      <div className="message-container">
        <div className="message-icon" style={messageIconStyle} />
            教學尚未結束, 確定離開?
          </div>
      <Button.Group>
        <IconButton type="accept" color="crimson" onClick={handleAccept} />
        <IconButton type="reject" color="royalblue" onClick={handleReject} />
      </Button.Group>
    </MessageBox>
  );
};

export default LeaveMessageBox;
