import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withData from '../../lib/withData';
import Page from '../../components/Page';
import { Huge } from '../../components/Type';

class EditPrices extends Component {
  handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    const { data: { loading, error, allPrices } } = this.props;
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
      <Page title="Edit Prices">
        <Huge text="Edit Prices" />
        {allPrices.map(price => (
          <div>
            <input
              type="text"
              defaultValue={price.size}
              name={`${price.size}-inch`}
            />
            <input
              type="text"
              defaultValue={price.basicPrice}
              name={`${price.size}-inch-basicPrice`}
            />
            <input
              type="text"
              defaultValue={price.detailedPrice}
              name={`${price.size}-inch-detailedPrice`}
            />
          </div>
        ))}
        <button>Update Prices</button>
      </Page>
    );
  }
}

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
})(EditPrices);

EditPrices.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.array,
      PropTypes.shape({}),
    ]),
    allPrices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        size: PropTypes.number,
        basicPrice: PropTypes.number,
        detailedPrice: PropTypes.number,
      })
    ),
  }).isRequired,
};

export default withData(GraphQLPrices);
