import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { Layout, Center } from '../elements';
import AppBar from '../components/AppBar';

const FrogIcon = styled.span`
  font-size: 100px;
  margin-top: 50px;
`;

function Home(props) {
  return (
    <Layout style={{ justifyContent: 'center' }}>
      <AppBar />
      <Center>
        <Typography variant="h2">Flying hacker frogs</Typography>
        <FrogIcon role="img" aria-label="froggy" variant="h2">
          🐸
        </FrogIcon>
      </Center>
    </Layout>
  );
}

export default Home;
