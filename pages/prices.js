import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withData from '../lib/withData';
import Page from '../components/Page';
import { Huge, Paragraph } from '../components/Type';
import PriceChart from '../components/PriceChart';

const Prices = ({ data: { loading, error, allPrices } }) => {
  if (error) {
    return (
      <p>
        An error has occured and we have been notified, sorry about that{' '}
        <span role="img" aria-label="sad face emoji">
          ☹️
        </span>
      </p>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Page title="Price Guide">
      <Huge text="The Flour Boutique Price Guide" />
      <PriceChart prices={allPrices} />
      <Paragraph>
        Please note: these are approximate sizes, they may not be the full size
        of the box, price goes by whichever side is the longest. There is some
        exception to the price: if a cookie 5”x3” it would go by the 4” size.
        The majority of cookies fall into the detail range and most are at least
        3-4” in size. All cookies are sold in 1 dozen or unless I am offering a
        prepackaged set. If ordering a set of multiple cookies (different
        sizes), the cost of a dozen is $40.
      </Paragraph>
    </Page>
  );
};

const PricesQuery = gql`
  query allPrices {
    allPrices {
      id
      size
      basicPrice
      detailedPrice
    }
  }
`;

const GraphQLPrices = graphql(PricesQuery, {
  props: ({ data }) => ({
    data,
  }),
})(Prices);

export default withData(GraphQLPrices);
