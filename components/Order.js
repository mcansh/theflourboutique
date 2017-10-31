import React from 'react';
import PropTypes from 'prop-types';

const Order = ({
  name,
  email,
  date,
  city,
  flavor,
  theme,
  quantity,
  done,
  comments,
}) => (
  <div>
    <h1>Name: {name}</h1>
    <p>Email: {email}</p>
    <p>Date: {date}</p>
    <p>City: {city}</p>
    <p>Flavor: {flavor}</p>
    <p>Theme: {theme}</p>
    <p>Quantity: {quantity}</p>
    <p>Done: {done ? '✅' : '⬜'}</p>
    {comments ? <p>Comments: {comments}</p> : null}
    <style jsx>{`
      div {
        width: 100%;
        height: 100%;
        line-height: 1.5;
      }
      p {
        font-size: 1.6rem;
      }
    `}</style>
  </div>
);

Order.defaultProps = {
  comments: null,
};

Order.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  flavor: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
  comments: PropTypes.string,
};

export default Order;
