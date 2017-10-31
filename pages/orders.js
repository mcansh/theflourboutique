import React from 'react';
import withData from '../lib/withData';
import Page from '../components/Page';
import AllOrders from '../components/AllOrders';

const Order = withData(() => (
  <Page>
    <AllOrders />
  </Page>
));

export default Order;
