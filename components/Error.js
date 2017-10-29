import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => (
  <div>
    {message}
    <style jsx>{`
      div {
        padding: 1.5em;
        font-size: 1.4rem;
        color: white;
        background-color: red;
      }
    `}</style>
  </div>
);

ErrorMessage.propTypes = {};

export default ErrorMessage;
