import React from 'react';
import PropTypes from 'prop-types';

const Huge = ({ text }) => (
  <h1>
    {text}
    <style jsx>{`font-size: 72px;`}</style>
  </h1>
);

Huge.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Huge;
