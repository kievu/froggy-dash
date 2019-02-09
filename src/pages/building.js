import React from 'react';
import { Layout, Center } from '../elements';
import { Building as BuildingCard } from '../components/Building';

const Building = () => (
  <Layout>
    <Center>
      <BuildingCard />;
    </Center>
  </Layout>
);

export default Building;
