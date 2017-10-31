import React from 'react';
import PropTypes from 'prop-types';
import withData from '../lib/withData';
import Page from '../components/Page';
import SubmitOrder from '../components/SubmitOrder';
import Logo from '../components/Logo';
import { Huge } from '../components/Type';

const Order = withData(({ url }) => (
  <Page pathname={url.pathname}>
    <Logo style={{ marginTop: '6rem' }} />
    <Huge text="Cookie Order Quote" />
    <SubmitOrder />
  </Page>
));

Order.propTypes = {
  url: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Order;
