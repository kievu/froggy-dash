import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import SimplePieChart from '../SimplePieChart';

const Box = styled.div`
  display: flex;
  padding: 40px;
  border: 2px solid #6fa26f;
`;

function SummaryBox() {
  return (
    <Box>
      <div style={{ width: '50%' }}>
        <Typography paragraph variant="h5">
          Sammendrag
        </Typography>
        <Typography variant="h6">Gratulerer!</Typography>
        <Typography paragraph>
          Du har stilt ned varmen 92 ganger og slått av lyset 540 ganger
        </Typography>

        <Typography variant="h6">Forslag til forbedringer</Typography>
        <Typography>
          For optimal strømsparing, kunne du skrudd ned temperaturen 62 ganger
          og slått av lyset 344 ganger.
        </Typography>
      </div>
      <div style={{ width: '50%' }}>
        <SimplePieChart />
      </div>
    </Box>
  );
}

export default SummaryBox;
