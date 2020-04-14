import React from "react";
import Head from "next/head";
import "./page.scss";

export interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
}

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
