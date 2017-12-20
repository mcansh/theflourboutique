import React from 'react';
import PropTypes from 'prop-types';
import { Huge, H2 } from '../components/Type';
import Logo from '../components/Logo';
import { ButtonWrap, Button } from '../components/Button';
import Page from '../components/Page';

const Index = ({ url }) => (
  <Page pathname={url.pathname}>
    <Logo style={{ margin: '20px' }} />
    <Huge text="The Flour Boutique" />
    <H2 text="...where a little flour brings a bit of sunshine" />
    <ButtonWrap>
      <Button
        href="https://facebook.com/theflourboutique"
        text="Check us out on Facebook!"
      />
    </ButtonWrap>
  </Page>
);

Index.propTypes = {
  url: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Index;
