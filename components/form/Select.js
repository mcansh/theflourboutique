import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import FormField from './FormField';
import Label from './Label';

const Select = ({ options, onChange, name, default }) => (
  <FormField>
    <Label margin="0 0 1rem 0" htmlFor={name}>
      {name}
    </Label>
    <select id={name} onChange={onChange} name={name} value={default}>
      {options.map(({ selected, text, disabled }) => (
        <option key={text} disabled={disabled} selected={selected} value={text}>
          {opt.text}
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
  default: null,
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
  default: PropTypes.string,
};

export default Select;
