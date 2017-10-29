import React from 'react';
import PropTypes from 'prop-types';

const Huge = ({ text }) => (
  <h1>
    {text}
    <style jsx>{`
      h1 {
        font-size: 7.2rem;
        margin: 0.67em 0;
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

Huge.propTypes = {
  text: PropTypes.string.isRequired,
};

H2.propTypes = {
  text: PropTypes.string.isRequired,
};

export { Huge, H2 };
