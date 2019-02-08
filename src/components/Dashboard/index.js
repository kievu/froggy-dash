import React from 'react';
import styled from 'styled-components';

import { Center, Layout } from '../../elements';
import SummaryBox from './SummaryBox';
import Sensor from '../Sensor';
import { Card, CardContent } from '@material-ui/core';

const Container = styled.div`
  flex-grow: 1;
  padding: 24px;
  width: 90%;
`;

function Dashboard() {
  return (
    <Center>
      <Container>
        <SummaryBox />
        <Sensor id="84:F3:EB:76:DA:3A" />
      </Container>
    </Center>
  );
}

export default Dashboard;
