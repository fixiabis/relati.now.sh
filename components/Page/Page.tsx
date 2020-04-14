import React, { ReactNode } from "react";
import Head from "next/head";

import "./page.scss";

export type Props = {
  title: string,
  className?: string,
  children: ReactNode,
  [otherPropName: string]: any,
};

const Page = ({ title, children, className = "", ...props }: Props) => {
  className = `page${className && ` ${className}`}`;

  return (
    <div className={className} {...props}>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Page;
