import React from 'react';
import styled from 'styled-components';

import { Center } from '../../elements';
import SummaryBox from './SummaryBox';

const Container = styled.div`
  flex-grow: 1;
  padding: 24px;
`;

function Dashboard() {
  return (
    <Center>
      <Container>
        <SummaryBox />
      </Container>
    </Center>
  );
}

export default Dashboard;
