import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import slugify from 'slugify';
import { injectIntl } from 'react-intl';
import ProgressiveImage from './ProgressiveImage';

const Price = injectIntl(({ price, intl: { formatNumber } }) =>
  formatNumber(price, { style: 'currency', currency: 'USD' })
);

const ProductSquare = styled.div`
  display: block;
  height: 100%;
  width: 100%;
`;

const ImageWrap = styled.div`
  overflow: hidden;
  height: 90%;
  width: 100%;
  margin-bottom: 1rem;
`;

const Name = styled.h3`
  font-size: 1.4rem;
`;

const PriceText = styled.span`
  font-size: 1.4rem;
`;

const imageUrl = id =>
  `http://res.cloudinary.com/dof0zryca/image/upload/f_auto/theflourboutique/${id}`;

const imageThumbUrl = id =>
  `http://res.cloudinary.com/dof0zryca/image/upload/t_media_lib_thumb/theflourboutique/${id}`;

const Product = ({ product: { id, name, description, price, image } }) => (
  <ProductSquare>
    <Link
      href={`/shop/product?${id}`}
      as={`/shop/${slugify(name.toLowerCase())}`}
    >
      <a>
        <ImageWrap>
          <ProgressiveImage
            placeholder={{
              fallback: imageThumbUrl(image),
            }}
            source={{
              fallback: imageUrl(image),
            }}
            alt={description}
          />
        </ImageWrap>
        <Name>{name}</Name>
        <PriceText>{<Price price={price} />}</PriceText>
      </a>
    </Link>
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
