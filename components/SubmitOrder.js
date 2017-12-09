import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import Input from './form/Input';
import Select from './form/Select';
import TextArea from './form/TextArea';
import { Button } from './Button';

const earliestOrderDate = () => {
  const now = new Date();
  const threeWeeksFromNow = addDays(now, 21);

  const formattedDate = format(threeWeeksFromNow, 'YYYY-MM-DD');
  return formattedDate;
};

const minimumOrderQuantity = 12;

const convertToUTCEpoch = d => new Date(new Date(d).toUTCString()).getTime();

class SubmitOrder extends Component {
  state = {
    name: '',
    email: '',
    city: '',
    date: earliestOrderDate(),
    theme: '',
    quantity: minimumOrderQuantity,
    flavor: '',
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
    createOrder(
      name,
      email,
      city,
      convertToUTCEpoch(date),
      theme,
      parseFloat(quantity),
      flavor,
      comments,
    );
  };

  render() {
    return (
      <div>
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
            defaultValue="Flavor of Cookies"
            options={[
              { text: 'Flavor of Cookies', selected: true, disabled: true },
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
      </div>
    );
  }
}

const createOrder = gql`
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
