import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ margin, htmlFor, children }) => (
  <label htmlFor={htmlFor}>
    {children}
    <style jsx>{`
      label {
        display: block;
        text-align: left;
        margin: ${margin};
      }
    `}</style>
  </label>
);

Label.defaultProps = {
  margin: 0,
};

Label.propTypes = {
  margin: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Label;
