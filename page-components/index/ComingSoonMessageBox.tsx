import {
  MessageBox,
  Button,
  IconButton,
  MessageBoxProps,
} from '../../components';

export interface Props extends MessageBoxProps {
  onVerify?: () => void;
}

const ComingSoonMessageBox = ({
  show: isShow = true,
  onVerify: handleVerify,
  onCancel: handleCancel,
}: Props) => {
  const messageIconStyle = { backgroundImage: 'url(/icons/badge.svg)' };

  if (!isShow) {
    return <></>;
  }

  return (
    <MessageBox onCancel={handleCancel}>
      <div className="message-container">
        <div className="message-icon" style={messageIconStyle} />
        敬請期待!
      </div>
      <Button.Group className="no-animation">
        <IconButton type="verify" color="seagreen" onClick={handleVerify} />
      </Button.Group>
    </MessageBox>
  );
};

export default ComingSoonMessageBox;
