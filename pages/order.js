import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
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
    errors: {
      name: '',
      email: '',
      city: '',
      date: '',
      theme: '',
      quantity: '',
      flavor: '',
    },
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    this.setState({ [lowercaseName]: value });
  };

  validate = () => {
    let hasErrors = false;
    const { name, email, city, date, theme, quantity, flavor } = this.state;
    const errors = {};
    if (!name) {
      hasErrors = true;
      errors.name = 'Name is required';
    }

    if (!email || isEmail(email)) {
      hasErrors = true;
      errors.email = 'Email is required';
    }

    if (!city) {
      hasErrors = true;
      errors.city = 'City is required';
    }

    if (!theme) {
      hasErrors = true;
      errors.theme = 'Theme is required';
    }

    if (flavor === cookieOptions[0]) {
      hasErrors = true;
      errors.flavor = 'Flavor is required';
    }

    if (date < earliestOrderDate()) {
      hasErrors = true;
      errors.date = 'Date must be at least 3 weeks in advance';
    }

    if (quantity < minimumOrderQuantity) {
      hasErrors = true;
      errors.quantity = `Must order at least ${minimumOrderQuantity} cookies`;
    }

    if (hasErrors) {
      this.setState({
        ...this.state,
        errors,
      });
    }
    return hasErrors;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const error = this.validate();

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
    if (!error) {
      createOrder(
        name,
        normalizeEmail(email),
        city,
        convertToUTCEpoch(date),
        theme,
        parseFloat(quantity),
        flavor,
        comments
      );
    }
  };

  render() {
    const {
      name,
      email,
      city,
      date,
      theme,
      flavor,
      quantity,
      errors,
    } = this.state;
    return (
      <Page title="Order">
        <Logo style={{ marginTop: '6rem' }} />
        <Huge text="Cookie Order Quote" />
        <form onSubmit={this.handleSubmit}>
          <Input
            name="Name"
            type="text"
            onChange={this.handleOnChange}
            value={name}
            placeholder="Name"
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
            error={errors.name}
            autocomplete="name"
          />
          <Input
            name="Email"
            type="email"
            onChange={this.handleOnChange}
            value={email}
            placeholder="Email"
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
            error={errors.email}
            autocomplete="email"
          />
          <Input
            name="City"
            type="text"
            onChange={this.handleOnChange}
            value={city}
            placeholder="City"
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
            error={errors.city}
            autocomplete="address-level2"
          />
          <Input
            name="Date"
            type="date"
            onChange={this.handleOnChange}
            value={date}
            min={earliestOrderDate()}
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
            error={errors.date}
          />
          <Input
            name="Theme"
            type="text"
            onChange={this.handleOnChange}
            value={theme}
            placeholder="Ex: wedding shower, baby shower"
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
            error={errors.theme}
          />
          <Input
            name="Quantity"
            type="number"
            onChange={this.handleOnChange}
            value={quantity}
            placeholder="Quantity"
            min={minimumOrderQuantity}
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
            error={errors.Quantity}
          />
          <Select
            onChange={this.handleOnChange}
            name="Flavor"
            defaultValue={flavor}
            disabled={cookieOptions[0]}
            options={cookieOptions}
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
            error={errors.flavor}
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
