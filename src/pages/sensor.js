import React from 'react';
import { Layout, Center } from '../elements';

import { Sensor as SensorCard } from '../components/Sensor';

const Sensor = () => (
  <Layout>
    <Center>
      <SensorCard />;
    </Center>
  </Layout>
);

export default Sensor;
