import React, {Fragment} from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Back2Home from '../components/Back2Home';
import { initGA, logPageView } from '../lib/analytics';
import withSentry from '../lib/withSentry';

import { colors } from '../theme';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class Page extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      // Google Analytics
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }
      logPageView();
      // Service Worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then(console.log('service worker registration successful')) // eslint-disable-line no-console
          .catch(err => console.warn(err)); // eslint-disable-line no-console
      }
    }
  }
  render() {
    const { title, children, pathname } = this.props;
    return (
      <Fragment>
        <Head>
          <title>
            {title ? `${title} - The Flour Boutique` : 'The Flour Boutique'}
          </title>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400"
            rel="stylesheet"
          />
        </Head>
        {pathname && pathname !== '/' && <Back2Home />}
        <div className="wrapper">{children}</div>
        <Footer />
        <style jsx global>{`
          :global(*),
          :global(*::before),
          :global(*::after) {
            box-sizing: border-box;
            font-weight: 300;
            margin: 0;
          }

          html {
            font-size: 10px;
          }

          body {
            font-family: 'Open Sans';
            text-align: center;
            line-height: 1.15;
            text-size-adjust: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-weight: 300;
            padding-top: env(safe-area-inset-top);
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
            padding-bottom: env(safe-area-inset-bottom);
            padding-top: constant(safe-area-inset-top);
            padding-left: constant(safe-area-inset-left);
            padding-right: constant(safe-area-inset-right);
            padding-bottom: constant(safe-area-inset-bottom);
            min-height: 100vh;
          }

          #nprogress {
            pointer-events: none;
          }

          #nprogress .bar {
            background: ${colors.pink};
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
          }

          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${colors.pink}, 0 0 5px ${colors.pink};
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px);
          }
        `}</style>
        <style jsx>{`
          .wrapper {
            min-height: calc(100vh - 100px);
            width: 100vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          @media (max-width: 700px) {
            .wrapper {
              margin-top: 3rem;
            }
          }
        `}</style>
      </Fragment>
    );
  }
}

Page.defaultProps = {
  title: null,
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  pathname: PropTypes.string.isRequired,
};

export default withSentry(Page);
