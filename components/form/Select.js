import React from 'react';
import PropTypes from 'prop-types';
import { colors, input } from '../../theme';
import FormField from './FormField';
import Label from './Label';

const Select = ({
  options,
  onChange,
  name,
  defaultValue,
  margin,
  color,
  disabled,
  error,
}) => (
  <FormField>
    <Label margin={margin} htmlFor={name} color={color}>
      {error || name}
    </Label>
    <select
      id={name}
      onChange={onChange}
      name={name}
      value={defaultValue}
      style={{ ...input }}
    >
      {options.map(opt => (
        <option key={opt} value={opt} disabled={opt === disabled}>
          {opt}
        </option>
      ))}
    </select>
    <style jsx>{`
      select {
        max-width: 100%;
        width: 100%;
        appearance: none;
        border: ${error
          ? '1px solid #c71f16'
          : `1px solid ${colors.secondary}`};
        transition: 200ms border ease-in-out;
        will-change: border-color;
        padding: 1rem 1.5rem;
        margin-bottom: 0.5rem;
        background: #fff;
        border-radius: 0.5rem;
        outline: none;
      }

      select:focus {
        border-color: black;
      }
    `}</style>
  </FormField>
);

Select.defaultProps = {
  defaultValue: null,
  margin: 0,
  color: 'black',
  disabled: '',
  error: '',
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  margin: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.string,
  error: PropTypes.string,
};

export default Select;
