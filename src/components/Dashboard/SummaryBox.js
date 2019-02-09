import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import SimplePieChart from '../SimplePieChart';
import { HTMLEntities } from '../../utils/stringUtils';

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
          Sammendrag for <strong>Voksenåsen</strong>
        </Typography>
        <Typography variant="h6">Gratulerer!</Typography>
        <Typography paragraph>
          Du har skrudd ned temperaturen <strong>92</strong> ganger og slått av
          lyset <strong>540</strong> ganger når rom ikke har vært i bruk.
        </Typography>

        <Typography variant="h6">Forslag til forbedringer</Typography>
        <Typography paragraph>
          For optimal strømsparing kunne du skrudd ned temperaturen{' '}
          <strong>62</strong> ganger og slått av lyset <strong>344</strong>{' '}
          ganger til.
        </Typography>

        <Typography variant="h6">Potensial for sparing</Typography>
        <Typography paragraph>
          Dette ville spart <strong>270kWh</strong>. Dette tilsvarer ca.{' '}
          <strong>200 000,{HTMLEntities.ndash}</strong> i året.
        </Typography>
      </div>
      <div
        style={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <h2>Energiforbruk i kWh</h2>
        <SimplePieChart />
      </div>
    </Box>
  );
}

export default SummaryBox;
