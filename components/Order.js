import React from 'react';
import PropTypes from 'prop-types';

const Order = ({ name, email, date, city, theme, quantity, done }) => (
  <li>
    <p>{name}</p>
    <p>{email}</p>
    <p>{date}</p>
    <p>{city}</p>
    <p>{theme}</p>
    <p>{quantity}</p>
    <input type="checkbox" checked={done} readOnly />
    <style jsx>{`
      li {
        width: 100%;
        line-height: 1.5;
        list-style: none;
        display: flex;
        font-size: 1.2rem;
      }
      li > p {
        flex: 1;
      }
    `}</style>
  </li>
);

Order.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
};

export default Order;
