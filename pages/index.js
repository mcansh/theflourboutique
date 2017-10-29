import React from 'react';
import { Huge, H2 } from '../components/Type';
import Logo from '../components/Logo';
import { Button } from '../components/Button';
import Page from '../components/Page';

const Index = () => (
  <Page>
    <Logo style={{ margin: '20px' }} />
    <Huge text="The Flour Boutique" />
    <H2 text="...where a little flour brings a bit of sunshine" />
    <Button
      href="https://facebook.com/theflourboutique"
      text="Check us out on Facebook!"
    />
  </Page>
);

export default Index;
