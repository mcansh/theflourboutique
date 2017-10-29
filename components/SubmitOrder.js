import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Logo from './Logo';
import { Huge } from './Type';
import Back2Home from '../components/Back2Home';
import Input from './form/Input';
import Select from './form/Select';
import { Button } from './Button';

const now = new Date();
const earliestOrderEpoch = now.setDate(now.getDate() + 21);
const earliestOrder = new Date(earliestOrderEpoch).toISOString();

class SubmitOrder extends Component {
  state = {
    name: undefined,
    email: undefined,
    city: undefined,
    date: earliestOrder,
    theme: undefined,
    quantity: 12,
    flavor: undefined,
    comments: undefined,
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const {
      name,
      email,
      city,
      date,
      theme,
      quantity,
      flavor,
      comments,
    } = this.state;

    const { createOrder } = this.props;

    createOrder(name, email, city, date, theme, quantity, flavor, comments);
  };

  render() {
    return (
      <div>
        <Back2Home />
        <Logo />
        <Huge text="Cookie Order Quote" />
        <form onSubmit={this.handleSubmit}>
          <Input
            name="Name"
            type="text"
            onChange={this.handleOnChange}
            value={this.state.name}
            placeholder="Name"
            required
          />
          <Input
            name="Email"
            type="email"
            onChange={this.handleOnChange}
            value={this.state.email}
            placeholder="Email"
            required
          />
          <Input
            name="City"
            type="text"
            onChange={this.handleOnChange}
            value={this.state.city}
            placeholder="City"
            required
          />
          <Input
            name="Date"
            type="date"
            onChange={this.handleOnChange}
            value={this.state.date}
            min={earliestOrder}
            required
          />
          <Input
            name="Theme"
            type="text"
            onChange={this.handleOnChange}
            value={this.state.theme}
            placeholder="Ex: wedding shower, baby shower"
            required
          />
          <Input
            name="Quantity"
            type="number"
            onChange={this.handleOnChange}
            value={this.state.quantity}
            placeholder="Quantity"
            min={12}
            required
          />
          <Select
            options={[
              { text: 'Flavor of Cookies', disabled: true, selected: true },
              { text: 'Vanilla sugar cookie with almond royal icing' },
              { text: 'Chocolate cookie with vanilla royal icing' },
              { text: 'Lemon poppyseed sugar cookie with lemon royal icing' },
              { text: 'Lemon sugar cookie with raspberry royal icing' },
              {
                text:
                  'Cookies and Cream sugar cookie with Cookies and Cream royal icing',
              },
              { text: 'Mint Chocolate Chip cookie with mint royal icing' },
            ]}
          />
          <Button basic text="Submit" />
        </form>
        <style jsx>{`
          form {
            max-width: 400px;
            width: 90%;
            margin: 0 auto;
          }
        `}</style>
      </div>
    );
  }
}

const createOrder = gql`
  mutation createOrder(
    $name: String!
    $email: String!
    $city: String!
    $date: DateTime!
    $theme: String!
    $quantity: Int!
    $flavor: String!
    $comments: String
  ) {
    createOrder(
      name: $name
      email: $email
      city: $city
      date: $date
      theme: $theme
      quantity: $quantity
      flavor: $flavor
      comments: $comments
    ) {
      createdAt
      id
      name
      email
      city
      date
      theme
      quantity
      flavor
      comments
    }
  }
`;

export default graphql(createOrder, {
  props: ({ mutate }) => ({
    createOrder: (name, email, city, date, theme, quantity, flavor, comments) =>
      mutate({
        variables: {
          name,
          email,
          city,
          date,
          theme,
          quantity,
          flavor,
          comments,
        },
      }),
  }),
})(SubmitOrder);
