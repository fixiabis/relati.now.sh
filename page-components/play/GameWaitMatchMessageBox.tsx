import { MessageBox, Button, IconButton, MessageBoxProps } from "../../components";

export interface Props extends MessageBoxProps {
  onReject?: () => void;
}

const GameWaitMatchMessageBox = ({ show: isShow, onCancel: handleCancel, onReject: handleReject }: Props) => {
  const messageIconStyle = { backgroundImage: "url(/icons/loading.svg)" };

  if (!isShow) {
    return <></>;
  }

  return (
    <MessageBox onCancel={handleCancel}>
      <div className="message-container">
        <div className="message-icon rotate" style={messageIconStyle} />
        正在進行配對
      </div>
      <Button.Group>
        <IconButton type="reject" color="royalblue" onClick={handleReject} />
      </Button.Group>
    </MessageBox>
  );
};

export default GameWaitMatchMessageBox;
