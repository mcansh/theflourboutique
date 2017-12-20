import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withData from '../lib/withData';
import Page from '../components/Page';
import Input from '../components/form/Input';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await this.props.mutate({
      variables: this.state
    });
    const { token } = response.data.signinUser;
    document.cookie = `token=${token}`;
    Router.push('/');
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    this.setState({ [lowercaseName]: value });
  };

  render() {
    const { url } = this.props;
    return (
      <Page pathname={url.pathname} title="Login">
        <form onSubmit={this.handleSubmit}>
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
            name="Password"
            type="password"
            onChange={this.handleOnChange}
            value={this.state.password}
            placeholder="Password"
            margin="0 0 1rem 0"
            color="rgba(0, 0, 0, 0.4)"
          />
          <button>Login</button>
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

Login.propTypes = {
  url: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  mutate: PropTypes.func.isRequired
};

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

const graphQLLogin = graphql(loginMutation)(Login);

export default withData(graphQLLogin);
