import React from 'react';
import { Layout, Center } from '../elements';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { Building as BuildingCard } from '../components/Building';

const Building = () => (
  <Layout>
    <Center>
      <BuildingCard />;
    </Center>
  </Layout>
);

export default Building;
