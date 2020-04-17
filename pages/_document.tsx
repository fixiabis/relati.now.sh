import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class RelatiDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/styles/common.css" />
          <script src="/scripts/polyfill.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default RelatiDocument;
