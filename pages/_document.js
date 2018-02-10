import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { colors } from '../theme';
import { description } from '../package.json';

const sizes = [32, 57, 72, 96, 120, 128, 144, 152, 195, 228];

const favicons = sizes.map(size => (
  <link
    key={size}
    rel="icon"
    href={`/static/favicon-${size}.png`}
    sizes={`${size}x${size}`}
  />
));

class MyDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { req: { locale, localeDataScript } } = context;
    return {
      ...props,
      locale,
      localeDataScript,
    };
  }

  render() {
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${
      this.props.locale
    }`;
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
          {favicons}
        </Head>
        <body>
          <Main />
          <script src={polyfill} />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript,
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
