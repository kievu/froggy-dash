import React from 'react';
import { Layout, Center } from '../elements';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { Room as RoomCard } from '../components/Room';

const Room = () => (
  <Layout>
    <Center>
      <RoomCard />;
    </Center>
  </Layout>
);

export default Room;
