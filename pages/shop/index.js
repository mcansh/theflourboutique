import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withData from '../../lib/withData';
import Page from '../../components/Page';

const Shop = ({ data: { loading, error, allProducts } }) => {
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
    <Page Page title="Shop">
      {allProducts.map(product => <p>{product.name}</p>)}
    </Page>
  );
};

Shop.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.array,
      PropTypes.shape({}),
    ]),
    allProducts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
        image: PropTypes.string,
      })
    ),
  }).isRequired,
};

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

const GraphQLAllProducts = graphql(AllProductsQuery, {
  props: ({ data }) => ({
    data,
  }),
})(Shop);

export default withData(GraphQLAllProducts);
