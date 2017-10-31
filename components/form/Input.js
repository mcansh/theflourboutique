import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import FormField from './FormField';
import Label from './Label';

const Input = ({ name, placeholder, onChange, type, value, required, min }) => {
  const lowercaseName = name.toLowerCase();
  return (
    <FormField>
      <Label margin="0 0 1rem 0" htmlFor={lowercaseName}>
        {name}
      </Label>
      <input
        id={lowercaseName}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        required={required}
        min={min}
      />
      <style jsx>{`
        input {
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

Input.defaultProps = {
  value: undefined,
  required: false,
  min: null,
  type: 'text',
  placeholder: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;
