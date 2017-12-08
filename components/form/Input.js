import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import FormField from './FormField';
import Label from './Label';

const Input = ({
  name,
  placeholder,
  onChange,
  type,
  value,
  required,
  min,
  max,
  margin,
  color,
}) => {
  const lowercaseName = name.toLowerCase();
  return (
    <FormField>
      <Label margin={margin} color={color} htmlFor={lowercaseName}>
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
        max={max}
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
  max: null,
  type: 'text',
  placeholder: '',
};

Input.defaultProps = {
  margin: 0,
  color: 'black',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.string,
  color: PropTypes.string,
};

export default Input;
