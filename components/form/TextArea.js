import React from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import Label from './Label';
import { colors } from '../../theme';

const TextArea = ({ name, onChange }) => {
  const lowercaseName = name.toLowerCase();
  return (
    <FormField>
      <Label margin="0 0 1rem 0" htmlFor={lowercaseName}>
        {name}
      </Label>
      <textarea id={lowercaseName} name={name} onChange={onChange} />
      <style jsx>{`
        textarea {
          max-width: 100%;
          width: 100%;
          appearance: none;
          border: 1px solid ${colors.pink};
          padding: 1rem 1.5rem;
          margin-bottom: 0.5rem;
          background: #fff;
          border-radius: 0.5rem;
          outline: none;
          font-size: 1.6rem;
        }
      `}</style>
    </FormField>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextArea;
