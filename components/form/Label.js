import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ margin, htmlFor, color, children }) => (
  <label htmlFor={htmlFor}>
    {children}
    <style jsx>{`
      label {
        display: block;
        text-align: left;
        margin: ${margin};
        color: ${color};
      }
    `}</style>
  </label>
);

Label.defaultProps = {
  margin: 0,
  color: 'black',
};

Label.propTypes = {
  margin: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default Label;
