import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import checkForAuth from '../utils/checkForAuth';
import withData from '../lib/withData';
import Page from '../components/Page';
import { Huge } from '../components/Type';
import Order from '../components/Order';

const AllOrdersQuery = gql`
  query allOrders {
    allOrders {
      id
      name
      email
      date
      city
      flavor
      theme
      quantity
      done
      comments
    }
  }
`;

class Orders extends Component {
  static async getInitialProps(ctx) {
    await checkForAuth(ctx);
  }

  static propTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl: { formatDate } } = this.props;
    return (
      <Page title="All Orders">
        <Query query={AllOrdersQuery}>
          {({ loading, error, data: { allOrders } }) => {
            if (loading) return <Huge text="Loading..." />;
            if (error) return <Huge text="Error :(" />;
            return (
              <Fragment>
                <Huge text="All Cookie Orders" />
                <ul className="orders">
                  <li>
                    <p>Name:</p>
                    <p>Email:</p>
                    <p>Date:</p>
                    <p>City:</p>
                    <p>Theme:</p>
                    <p>Quantity:</p>
                    <p>Done:</p>
                  </li>
                  {allOrders &&
                    allOrders.map(order => (
                      <Order
                        key={order.id}
                        name={order.name}
                        email={order.email}
                        date={formatDate(order.date)}
                        city={order.city}
                        theme={order.theme}
                        quantity={order.quantity}
                        done={order.done}
                      />
                    ))}
                </ul>
                <style jsx>{`
                  .orders {
                    width: 100%;
                    padding: 0;
                  }
                  li {
                    width: 100%;
                    line-height: 1.5;
                    list-style: none;
                    display: flex;
                    font-size: 1.2rem;
                  }
                  li > p {
                    flex: 1;
                  }
                `}</style>
              </Fragment>
            );
          }}
        </Query>
      </Page>
    );
  }
}

export default injectIntl(withData(Orders));
