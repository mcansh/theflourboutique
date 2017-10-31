import React from 'react';
import withData from '../lib/withData';
import Page from '../components/Page';
import SubmitOrder from '../components/SubmitOrder';

const Order = withData(() => (
  <Page>
    <SubmitOrder />
  </Page>
));

export default Order;
