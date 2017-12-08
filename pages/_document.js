import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { colors } from '../theme';
import { description } from '../package.json';

class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          />
          <link rel="manifest" href="/manifest.json" />
          <link type="text/plain" rel="author" href="/static/humans.txt" />
          <link
            rel="mask-icon"
            href="/static/images/logo/logo.svg"
            color={colors.pink}
          />
          <meta name="theme-color" content={colors.pink} />
          <link rel="shortcut icon" href="/static/logo.png" />
          <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
