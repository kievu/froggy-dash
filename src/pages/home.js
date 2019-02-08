import React, { useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import { Layout, Center } from '../elements';
import AppBar from '../components/AppBar';
import { AuthUserContext } from '../components/AuthUser';

const FrogIcon = styled.span`
  font-size: 100px;
  margin-top: 50px;
`;

function Home() {
  const authUser = useContext(AuthUserContext);
  return authUser ? (
    <Redirect to="/dashboard" />
  ) : (
    <Layout style={{ justifyContent: 'center' }}>
      <AppBar />
      <Center>
        <Typography variant="h2">Flying hacker frogs</Typography>
        <FrogIcon variant="h2">
          <span role="img" aria-label="Frog">
            🐸
          </span>
        </FrogIcon>
      </Center>
    </Layout>
  );
}

export default Home;
