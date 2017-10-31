import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Huge } from './Type';
import Back2Home from '../components/Back2Home';
import Order from './Order';

const formatDate = epoch => {
  const date = new Date(epoch);
  const m = date.getMonth() + 1;
  const month = m < 10 ? `0${m}` : `${m}`;
  const d = date.getDate() + 1;
  const day = d < 10 ? `0${d}` : `${d}`;
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const AllOrders = ({ data: { loading, error, allOrders } }) => {
  if (error) {
    return <Huge text={error} />;
  }
  if (loading) {
    return <Huge text="Loading..." />;
  }
  return (
    <div>
      <Back2Home />
      <Huge text="All Cookie Orders" />
      <div className="orders">
        {allOrders.map(
          ({
            id,
            name,
            email,
            date,
            city,
            flavor,
            theme,
            quantity,
            done,
            comments,
          }) => {
            const formattedDate = formatDate(date);
            return (
              <Order
                key={id}
                name={name}
                email={email}
                date={formattedDate}
                city={city}
                flavor={flavor}
                theme={theme}
                quantity={quantity}
                done={done}
                comments={comments}
              />
            );
          },
        )}
      </div>
      <style jsx>{`
        .orders {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 1fr;
        }
      `}</style>
    </div>
  );
};

const AllOrdersQuery = gql`
  query allOrders {
    allOrders {
      id
      name
      email
      date
      city
      flavor
      theme
      quantity
      done
      comments
    }
  }
`;

AllOrders.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.string,
    allOrders: PropTypes.object,
  }).isRequired,
};

export default graphql(AllOrdersQuery, {
  props: ({ data }) => ({
    data,
  }),
})(AllOrders);
