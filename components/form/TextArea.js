import React from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import Label from './Label';
import { colors, input } from '../../theme';

const TextArea = ({ name, onChange, margin, color }) => {
  const lowercaseName = name.toLowerCase();
  return (
    <FormField>
      <Label margin={margin} htmlFor={lowercaseName} color={color}>
        {name}
      </Label>
      <textarea
        id={lowercaseName}
        name={name}
        onChange={onChange}
        style={{ ...input }}
      />
      <style jsx>{`
        textarea {
          resize: vertical;
          max-width: 100%;
          width: 100%;
          appearance: none;
          border: 1px solid ${colors.secondary};
          transition: 200ms border ease-in-out;
          will-change: border-color;
          padding: 1rem 1.5rem;
          margin-bottom: 0.5rem;
          background: #fff;
          border-radius: 0.5rem;
          outline: none;
          min-height: 100px;
        }

        textarea:focus {
          border-color: black;
        }
      `}</style>
    </FormField>
  );
};

TextArea.defaultProps = {
  margin: 0,
  color: 'black',
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  margin: PropTypes.string,
  color: PropTypes.string,
};

export default TextArea;
