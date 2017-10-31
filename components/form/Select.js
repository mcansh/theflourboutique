import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import FormField from './FormField';

const Select = ({ options, onChange, name }) => (
  <FormField>
    <select onChange={onChange} name={name}>
      {options.map(opt => (
        <option
          key={opt.text}
          disabled={opt.disabled}
          selected={opt.selected}
          value={opt.text}
        >
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
};

export default Select;
