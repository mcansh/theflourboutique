import React from 'react';
import withData from '../lib/withData';
import Page from '../components/Page';
import SubmitOrder from '../components/SubmitOrder';

export default withData(() => (
  <Page>
    <SubmitOrder />
  </Page>
));
