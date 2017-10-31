import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({ children }) => (
  <fieldset>
    {children}
    <style jsx>{`
      fieldset {
        margin: 0;
        border: 0;
        padding: 0;
        font-size: 1.6rem;
      }
    `}</style>
  </fieldset>
);

FormField.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormField;
