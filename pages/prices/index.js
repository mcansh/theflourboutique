import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import withData from '../../lib/withData';
import Page from '../../components/Page';
import { Huge, Paragraph } from '../../components/Type';
import PriceChart from '../../components/PriceChart';

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

const Prices = () => (
  <Page title="Price Guide">
    <Query query={PricesQuery}>
      {({ loading, error, data: { allPrices } }) => {
        if (loading) return <Huge text="Loading..." />;
        if (error) return <Huge text="Error :(" />;
        return (
          <Fragment>
            <Huge text="The Flour Boutique Price Guide" />
            <PriceChart prices={allPrices} />
            <Paragraph size={2}>
              Please note: these are approximate sizes, they may not be the full
              size of the box, price goes by whichever side is the longest.
              There is some exception to the price: if a cookie 5”x3” it would
              go by the 4” size. The majority of cookies fall into the detail
              range and most are at least 3-4” in size. All cookies are sold in
              1 dozen unless I am offering a prepackaged set. If ordering a set
              of multiple cookies (different sizes), the cost of a dozen is $40.
            </Paragraph>
          </Fragment>
        );
      }}
    </Query>
  </Page>
);

export default withData(Prices);
