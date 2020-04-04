import React from "react";

import "./index.scss";

export type Props = {
  [otherPropName: string]: any,
  className?: string,
};

const MessageBox = ({ className, ...props }: Props) => {
  const classNames = className ? className.split(" ") : [];
  classNames.push("message-box");

  return (
    <div className="message-box-container">
      <div {...props} className={classNames.join(" ")} />
    </div>
  );
};

export default MessageBox;
