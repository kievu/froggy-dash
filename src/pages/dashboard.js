import React from 'react';
import { Typography } from '@material-ui/core';
import { Layout, Center } from '../elements';
import AppBar from '../components/AppBar';

function Home(props) {
  return (
    <Layout style={{ justifyContent: 'center' }}>
      <AppBar />
      <Center>
        <Typography variant="h2">Dashboard</Typography>
      </Center>
    </Layout>
  );
}

export default Home;
