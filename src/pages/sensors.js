import React, { useState, useEffect } from 'react';
import { Layout, Center } from '../elements';
import { CircularProgress } from '@material-ui/core';

import { withFirebase } from '../Firebase';
import Sensor from '../components/Sensor';

function Sensors({ firebase }) {
  const [sensorData, setData] = useState({ loading: true, measurements: null });
  useEffect(() => {
    firebase
      .measurements()
      .on('value', snapshot =>
        setData({ loading: false, measurements: snapshot.val() }),
      );
  });

  return sensorData.loading ? (
    <Layout>
      <Center>
        <CircularProgress />
      </Center>
    </Layout>
  ) : (
    <Layout>
      {Object.keys(sensorData.measurements).map(sensorId => (
        <Sensor key={sensorId} id={sensorId} />
      ))}
    </Layout>
  );
}

export default withFirebase(Sensors);
