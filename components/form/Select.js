import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import FormField from './FormField';
import Label from './Label';

const Select = ({ options, onChange, name, defaultValue }) => (
  <FormField>
    <Label margin="0 0 1rem 0" htmlFor={name} color="rgba(0, 0, 0, 0.4)">
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
};

export default Select;
