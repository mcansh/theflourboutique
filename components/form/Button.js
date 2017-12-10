import React from 'react';
import PropTypes from 'prop-types';
import { input } from '../../theme';

const Button = ({ text }) => <button style={{ ...input }}>{text}</button>;

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
