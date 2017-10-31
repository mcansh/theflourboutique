import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import FormField from './FormField';

const Input = ({ name, placeholder, onChange, type, value, required, min }) => {
  const lowercaseName = name.toLowerCase();
  return (
    <FormField>
      <label htmlFor={lowercaseName}>{name}</label>
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
        label {
          display: block;
          text-align: left;
        }

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
