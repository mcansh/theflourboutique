import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import format from 'date-fns/format';
import checkForAuth from '../lib/checkForAuth';
import withData from '../lib/withData';
import Page from '../components/Page';
import { Huge } from '../components/Type';
import Order from '../components/Order';

const Orders = ({ data: { loading, error, allOrders } }) => {
  if (error) {
    return <Page />;
  }

  if (loading) {
    return <Huge text="Loading..." />;
  }

  return (
    <Page title="All Orders">
      <Huge text="All Cookie Orders" />
      <ul className="orders">
        <li>
          <p>Name:</p>
          <p>Email:</p>
          <p>Date:</p>
          <p>City:</p>
          <p>Theme:</p>
          <p>Quantity:</p>
          <p>Done:</p>
        </li>
        {allOrders &&
          allOrders.map(order => (
            <Order
              key={order.id}
              name={order.name}
              email={order.email}
              date={format(order.date, 'MM/DD/YYYY')}
              city={order.city}
              theme={order.theme}
              quantity={order.quantity}
              done={order.done}
            />
          ))}
      </ul>
      <style jsx>{`
        .orders {
          width: 100%;
          padding: 0;
        }
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
    </Page>
  );
};

Orders.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.string,
    allOrders: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.string,
        comments: PropTypes.string,
        date: PropTypes.number,
        done: PropTypes.bool,
        email: PropTypes.string,
        flavor: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        quantity: PropTypes.number,
        theme: PropTypes.string,
      })
    ),
  }).isRequired,
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

Orders.getInitialProps = ctx => {
  checkForAuth(ctx);
};

const GraphQLAllOrders = graphql(AllOrdersQuery, {
  props: ({ data }) => ({
    data,
  }),
})(Orders);

export default withData(GraphQLAllOrders);
