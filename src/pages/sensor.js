import React from 'react';
import { Layout, Center } from '../elements';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { Sensor as SensorCard } from '../components/Sensor';

const Sensor = () => (
  <Layout>
    <Center>
      <SensorCard />;
    </Center>
  </Layout>
);

export default Sensor;
