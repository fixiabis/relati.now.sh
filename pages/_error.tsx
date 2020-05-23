import React, { useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

export interface Props {
  statusCode: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  const router = useRouter();

  useEffect(() => {
    if (statusCode === 404) {
      router.replace("/");
    }
  });

  if (statusCode === 404) {
    return <></>
  }
  else {
    return <Link href="/">有東西爆炸了，回主畫面</Link>;
  }
}

Error.getInitialProps = async ({ res: response, err: error }) => {
  const statusCode = response ? response.statusCode : error?.statusCode || 404;
  return { statusCode };
};

export default Error
