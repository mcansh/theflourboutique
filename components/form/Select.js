import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import FormField from './FormField';
import Label from './Label';

const Select = ({ options, onChange, name, defaultValue, margin, color }) => (
  <FormField>
    <Label margin={margin} htmlFor={name} color={color}>
      {name}
    </Label>
    <select id={name} onChange={onChange} name={name} value={defaultValue}>
      {options.map(({ selected, text, disabled }) => (
        <option key={text} disabled={disabled} selected={selected} value={text}>
          {text}
        </option>
      ))}
    </select>
    <style jsx>{`
      select {
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

Select.defaultProps = {
  defaultValue: null,
  margin: 0,
  color: 'black',
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      disabled: PropTypes.bool,
      selected: PropTypes.bool,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  margin: PropTypes.string,
  color: PropTypes.string,
};

export default Select;
