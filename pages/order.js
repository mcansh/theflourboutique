import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import withData from '../lib/withData';
import Page from '../components/Page';
import Logo from '../components/Logo';
import { Huge } from '../components/Type';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import TextArea from '../components/form/TextArea';
import { Button } from '../components/Button';

const earliestOrderDate = () => {
  const now = new Date();
  const threeWeeksFromNow = addDays(now, 21);

  const formattedDate = format(threeWeeksFromNow, 'YYYY-MM-DD');
  return formattedDate;
};

const minimumOrderQuantity = 12;

const convertToUTCEpoch = d => new Date(new Date(d).toUTCString()).getTime();

const cookieOptions = [
  'Flavor of Cookies',
  'Vanilla sugar cookie with almond royal icing',
  'Chocolate cookie with vanilla royal icing',
  'Lemon poppyseed sugar cookie with lemon royal icing',
  'Lemon sugar cookie with raspberry royal icing',
  'Cookies and Cream sugar cookie with Cookies and Cream royal icing',
  'Mint Chocolate Chip cookie with mint royal icing',
];

class Order extends Component {
  state = {
    name: '',
    email: '',
    city: '',
    date: earliestOrderDate(),
    theme: '',
    quantity: minimumOrderQuantity,
    flavor: cookieOptions[0],
    comments: '',
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    this.setState({ [lowercaseName]: value });
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
    createOrder({
      name,
      email,
      city,
      date: convertToUTCEpoch(date),
      theme,
      quantity: parseFloat(quantity),
      flavor,
      comments,
    });
  };

  render() {
    return (
      <Page pathname={this.props.url.pathname} title="Order">
        <Logo style={{ marginTop: '6rem' }} />
        <Huge text="Cookie Order Quote" />
        <form onSubmit={this.handleSubmit}>
          <Input
            name="Name"
            type="text"
            onChange={this.handleOnChange}
            value={this.state.name}
            placeholder="Name"
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
          />
          <Input
            name="Email"
            type="email"
            onChange={this.handleOnChange}
            value={this.state.email}
            placeholder="Email"
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
          />
          <Input
            name="City"
            type="text"
            onChange={this.handleOnChange}
            value={this.state.city}
            placeholder="City"
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
          />
          <Input
            name="Date"
            type="date"
            onChange={this.handleOnChange}
            value={this.state.date}
            min={earliestOrderDate()}
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
          />
          <Input
            name="Theme"
            type="text"
            onChange={this.handleOnChange}
            value={this.state.theme}
            placeholder="Ex: wedding shower, baby shower"
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
          />
          <Input
            name="Quantity"
            type="number"
            onChange={this.handleOnChange}
            value={this.state.quantity}
            placeholder="Quantity"
            min={minimumOrderQuantity}
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
          />
          <Select
            onChange={this.handleOnChange}
            name="Flavor"
            defaultValue={this.state.flavor}
            disabled={cookieOptions[0]}
            options={cookieOptions}
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
          />
          <TextArea
            name="Comments"
            onChange={this.handleOnChange}
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
          />
          <Button basic text="Submit" />
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

Order.propTypes = {
  url: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

const createOrderMutation = gql`
  mutation createOrder(
    $name: String!
    $email: String!
    $city: String!
    $date: Float!
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

const GraphQLOrder = graphql(createOrderMutation, {
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
})(Order);

export default withData(GraphQLOrder);
