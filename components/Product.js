import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

const Price = injectIntl(({ price, intl: { formatNumber } }) =>
  formatNumber(price, { style: 'currency', currency: 'USD' })
);

const ProductSquare = styled.div`
  background: blue;
  color: red;
`;

const imageUrl = id =>
  `http://res.cloudinary.com/dof0zryca/image/upload/f_auto/${id}`;

const Product = ({ product: { name, description, price, image } }) => (
  <ProductSquare>
    {image && <img src={imageUrl(image)} alt={description} />}
    <p>{name}</p>
    <p>{<Price price={price} />}</p>
  </ProductSquare>
);

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};

export default Product;
