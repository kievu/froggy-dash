import React from 'react';
import styled from 'styled-components';

import { Center } from '../../elements';
import SummaryBox from './SummaryBox';
import MotionGraph from './MotionGraph';
import Sensor from '../Sensor';
import MotionDetector from './MotionDetector';

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
        <Sensor id="84:F3:EB:76:DA:3A" chartType="light" />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <MotionGraph id="84:F3:EB:76:DA:3A" />
          <MotionDetector id="84:F3:EB:76:DA:3A" />
        </div>
      </Container>
    </Center>
  );
}

export default Dashboard;
