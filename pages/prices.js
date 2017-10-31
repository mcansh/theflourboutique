import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import { Huge } from '../components/Type';

const Prices = ({ url: { pathname } }) => (
  <Page pathname={pathname}>
    <Huge text="The Flour Boutique Price Guide" />
  </Page>
);

Prices.propTypes = {
  url: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Prices;
