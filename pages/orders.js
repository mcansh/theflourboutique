import React from 'react';
import PropTypes from 'prop-types';
import withData from '../lib/withData';
import Page from '../components/Page';
import AllOrders from '../components/AllOrders';

const Orders = withData(({ url }) => (
  <Page pathname={url.pathname}>
    <AllOrders />
  </Page>
));

Orders.propTypes = {
  url: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Orders;
