import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import { Huge, Paragraph } from '../components/Type';
import PriceChart from '../components/PriceChart';

const prices = [
  {
    size: 1,
    basic: '$1.00',
    detailed: '$1.25',
  },
  {
    size: 2,
    basic: '$1.75',
    detailed: '$2.00',
  },
  {
    size: 3,
    basic: '$2.75',
    detailed: '$3.00',
  },
  {
    size: 4,
    basic: '$3.75',
    detailed: '$4.00',
  },
  {
    size: 5,
    basic: '$4.75',
    detailed: '$5.00',
  },
  {
    size: 6,
    basic: '$5.75',
    detailed: '$6.00',
  },
];

const Prices = ({ url: { pathname } }) => (
  <Page pathname={pathname} title="Price Guide">
    <Huge text="The Flour Boutique Price Guide" />
    <PriceChart prices={prices} />
    <Paragraph>
      Please note: these are approximate sizes, they may not be the full size of
      the box, price goes by whichever side is the longest. There is some
      exception to the price: if a cookie 5”x3” it would go by the 4” size. The
      majority of cookies fall into the detail range and most are at least 3-4”
      in size. All cookies are sold in 1 dozen or unless I am offering a
      prepackaged set. If ordering a set of multiple cookies (different sizes),
      the cost of a dozen is $40.
    </Paragraph>
  </Page>
);

Prices.propTypes = {
  url: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Prices;
