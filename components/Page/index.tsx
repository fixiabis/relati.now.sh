import React, { ReactNode } from "react";
import Head from "next/head";

import "./index.scss";

export type Props = {
    [otherPropName: string]: any,
    title: string,
    children: ReactNode,
    className?: string,
};

const Page = ({ title, children, className, ...props }: Props) => {
    const classNames = className ? className.split(" ") : [];
    classNames.push("page");

    return (
        <div {...props} className={classNames.join(" ")}>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </div>
    );
};

export default Page;
