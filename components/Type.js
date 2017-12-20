import React from 'react';
import PropTypes from 'prop-types';

const Huge = ({ text }) => (
  <h1>
    {text}
    <style jsx>{`
      h1 {
        font-size: 7.2rem;
        margin: 0.67em 0;
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
        padding-left: constant(safe-area-inset-left);
        padding-right: constant(safe-area-inset-right);
      }

      @media (max-width: 700px) {
        h1 {
          margin-bottom: 2rem;
        }
      }

      @media (max-width: 420px) {
        h1 {
          font-size: 6rem;
        }
      }

      @media (max-width: 375px) {
        h1 {
          font-size: 5.4rem;
        }
      }
    `}</style>
  </h1>
);

const H2 = ({ text }) => (
  <h2>
    {text}
    <style jsx>{`
      h2 {
        font-size: 2rem;
      }
      @media (max-width: 375px) {
        h2 {
          font-size: 18px;
        }
      }
    `}</style>
  </h2>
);

const Paragraph = ({ children }) => (
  <p>
    {children}
    <style jsx>{`
      p {
        font-size: 1.6rem;
        text-align: left;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px auto;
        line-height: 1.5;
        max-width: 70vw;
      }
      @media (max-width: 880px) {
        p {
          max-width: 80vw;
        }
      }
      @media (max-width: 550px) {
        p {
          max-width: 95vw;
        }
      }
    `}</style>
  </p>
);

const textProps = {
  text: PropTypes.string.isRequired,
};
Paragraph.propTypes = { children: PropTypes.node.isRequired };
Huge.propTypes = textProps;
H2.propTypes = textProps;

export { Huge, H2, Paragraph };
