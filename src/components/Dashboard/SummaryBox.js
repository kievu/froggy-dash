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
        <Typography style={{ marginBottom: '2rem' }} variant="h4">
          Sammendrag for <strong>Voksenåsen</strong>
        </Typography>
        <Typography style={{ marginBottom: '0.3rem' }} variant="h5">
          Gratulerer!
        </Typography>
        <Typography paragraph style={{ fontSize: '1rem' }}>
          Du har skrudd ned temperaturen <strong>92</strong> ganger og slått av
          lyset <strong>540</strong> ganger når rom ikke har vært i bruk.
        </Typography>

        <Typography style={{ marginBottom: '0.3rem' }} variant="h5">
          Forslag til forbedringer
        </Typography>
        <Typography paragraph style={{ fontSize: '1rem' }}>
          For optimal strømsparing kunne du skrudd ned temperaturen{' '}
          <strong>62</strong> ganger og slått av lyset <strong>344</strong>{' '}
          ganger til. Dette ville spart <strong>270kWh</strong>, som tilsvarer
          ca. <strong>200 000,{HTMLEntities.ndash}</strong> i året.
        </Typography>
      </div>
      <div
        style={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography paragraph variant="h5">
          Energiforbruk (kWh)
        </Typography>
        <SimplePieChart />
      </div>
    </Box>
  );
}

export default SummaryBox;
