import React, { ReactNode } from "react";
import Head from "next/head";

import "./index.scss";

export type Props = {
  title: string,
  className?: string,
  children: ReactNode,
  [otherPropName: string]: any,
};

const Page = ({ title, children, className = "", ...props }: Props) => {
  return (
    <div {...props} className={`page${className && ` ${className}`}`}>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Page;
