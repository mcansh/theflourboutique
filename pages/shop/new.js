import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withData from '../../lib/withData';
import Page from '../../components/Page';

import { Button } from '../../components/Button';
import { Huge } from '../../components/Type';
import Input from '../../components/form/Input';

class NewProduct extends Component {
  state = {
    name: '',
    description: '',
    price: 0,
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    this.setState({ [lowercaseName]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { name, description, price } = this.state;

    const { createProduct } = this.props;
    createProduct(name, description, parseFloat(price));
  };

  render() {
    const { name, description, price } = this.state;
    return (
      <Page title="Order">
        <Huge text="Create New Cookie" />
        <form onSubmit={this.handleSubmit}>
          <Input
            name="Name"
            type="text"
            onChange={this.handleOnChange}
            value={name}
            placeholder="Name"
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
          />
          <Input
            name="Description"
            type="text"
            onChange={this.handleOnChange}
            value={description}
            placeholder="Description"
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
          />
          <Input
            name="Price"
            type="text"
            onChange={this.handleOnChange}
            value={price}
            placeholder="Price"
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
          />
          <Button basic text="Create" />
        </form>
        <style jsx>{`
          form {
            max-width: 90%;
            width: 400px;
            margin: 0 auto;
          }
        `}</style>
      </Page>
    );
  }
}

const createProductMutation = gql`
  mutation createProductMutation(
    $name: String!
    $description: String
    $price: Float!
  ) {
    createProduct(name: $name, description: $description, price: $price) {
      name
      description
      price
    }
  }
`;

const GraphQLProduct = graphql(createProductMutation, {
  props: ({ mutate }) => ({
    createProduct: (name, description, price) =>
      mutate({
        variables: {
          name,
          description,
          price,
        },
      }),
  }),
})(NewProduct);

export default withData(GraphQLProduct);
