import React, { ReactNode } from "react";
import Head from "next/head";

import "./page.scss";

export type Props = {
  title: string,
  className?: string,
  children: ReactNode,
  [otherPropName: string]: any,
};

const Page = ({ title, children, className: pageClassName = "", ...props }: Props) => {
  pageClassName = `page${pageClassName && ` ${pageClassName}`}`;

  return (
    <div {...props} className={pageClassName}>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Page;
