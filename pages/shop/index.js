import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import withData from '../../lib/withData';
import Page from '../../components/Page';
import { Huge } from '../../components/Type';
import Product from '../../components/Product';

const AllProductsQuery = gql`
  query allProducts {
    allProducts {
      name
      price
      description
      image
      id
    }
  }
`;

const ProductWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;

const Shop = () => (
  <Page title="Shop">
    <Query query={AllProductsQuery}>
      {({ loading, error, data: { allProducts } }) => {
        if (loading) return <Huge text="Loading..." />;
        if (error) return <Huge text="Error :(" />;
        return (
          <ProductWrap>
            {allProducts.map(product => (
              <Product key={product.id} product={product} />
            ))}
          </ProductWrap>
        );
      }}
    </Query>
  </Page>
);

export default withData(Shop);
