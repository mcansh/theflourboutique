import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'apollo-boost';
import withData from '../../lib/withData';
import Page from '../../components/Page';
import { Huge } from '../../components/Type';

const AllProductsQuery = gql`
  query allProducts {
    allProducts {
      name
      price
      description
      image
    }
  }
`;

const Shop = () => (
  <Page Page title="Shop">
    <Query query={AllProductsQuery}>
      {({ loading, error, data: { allProducts } }) => {
        if (loading) return <Huge text="Loading..." />;
        if (error) return <Huge text="Error :(" />;
        return (
          <Fragment>
            {allProducts.map(product => <p>{product.name}</p>)}
          </Fragment>
        );
      }}
    </Query>
  </Page>
);

export default withData(Shop);
