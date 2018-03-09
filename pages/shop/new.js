import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import title from 'title';
import checkForAuth from '../../utils/checkForAuth';
import withData from '../../lib/withData';
import Page from '../../components/Page';
import { Button } from '../../components/Button';
import { Huge } from '../../components/Type';
import Input from '../../components/form/Input';

class NewProduct extends Component {
  static getInitialProps = ctx => {
    const user = checkForAuth(ctx);
    return user;
  };

  state = {
    name: '',
    description: '',
    price: 0,
    image: '',
  };

  handleUpload = async e => {
    e.preventDefault();
    const [file] = e.target.files;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.CLOUDINARY_PRESET);

    const url = `https://api.cloudinary.com/v1_1/${process.env
      .CLOUDINARY_NAME || 'dof0zryca'}/image/upload`;

    const res = await fetch(url, { method: 'POST', body: formData }).then(r =>
      r.json()
    );

    const { public_id } = res;

    this.setState({ image: public_id });
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    this.setState({
      [lowercaseName]: lowercaseName === 'name' ? title(value) : value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const {
      createProduct,
      user: { authData: { email: createdBy } },
    } = this.props;

    const { name, description, price, image } = this.state;

    createProduct(name, description, parseFloat(price), image, createdBy);
  };

  render() {
    const { name, description, price, image } = this.state;
    return (
      <Page title="New Cookie">
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
          {/* <input
            type="file"
            name="image"
            onChange={this.handleUpload}
            value={image}
          /> */}
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
    $image: String
    $createdBy: String!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      image: $image
      createdBy: $createdBy
    ) {
      id
    }
  }
`;

const GraphQLProduct = graphql(createProductMutation, {
  props: ({ mutate }) => ({
    createProduct: (name, description, price, image, createdBy) =>
      mutate({
        variables: {
          name,
          description,
          price,
          image,
          createdBy,
        },
      }),
  }),
})(NewProduct);

export default withData(GraphQLProduct);
