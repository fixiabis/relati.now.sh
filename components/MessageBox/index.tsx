import React from "react";

import "./index.scss";

const MessageBox = ({ className, ...props }) => {
    const classNames = className ? className.split(" ") : [];
    classNames.push("message-box");

    return (
        <div className="message-box-container">
            <div {...props} className={classNames.join(" ")} />
        </div>
    );
};

export default MessageBox;
